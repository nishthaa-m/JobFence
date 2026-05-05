import spacy
import re
import fitz  # PyMuPDF
from docx import Document
from collections import defaultdict
import io
from typing import Tuple, Dict, List, Optional, Set


class ResumeAnalyzer:
    SKILL_DIVERSITY_WEIGHT = 0.2
    MAX_SCORE_MULTIPLIER = 1.2

    def __init__(self):
        """Initialize the analyzer with skills database and NLP pipeline"""
        self.admin_skills = {
            # Technical Skills
            "Python": 5, "Java": 4, "JavaScript": 4, "C++": 3, "SQL": 5,
            "Machine Learning": 5, "Data Analysis": 4, "Statistics": 4,
            "Deep Learning": 4, "TensorFlow": 3, "PyTorch": 3, "AWS": 3,
            "React": 4, "Node.js": 3, "HTML": 3, "CSS": 3, "Docker": 3,
            "Kubernetes": 3, "Git": 3, "Spark": 3, "Pandas": 4, "Numpy": 3,
            # Soft Skills
            "Communication": 2, "Leadership": 2, "Teamwork": 2, "Problem Solving": 3
        }

        self.job_requirements = {
            "Data Scientist": {
                "Python": 5, "Machine Learning": 5, "Statistics": 4, "SQL": 4,
                "Data Analysis": 4, "Deep Learning": 3, "TensorFlow": 3, "Pandas": 4
            },
            "Frontend Developer": {
                "JavaScript": 5, "React": 5, "HTML": 4, "CSS": 4,
                "TypeScript": 3, "UI/UX": 3, "Node.js": 3
            },
            "Backend Developer": {
                "Python": 4, "Java": 4, "SQL": 4, "AWS": 3,
                "Docker": 3, "Kubernetes": 3, "Node.js": 4
            },
            "DevOps Engineer": {
                "Docker": 5, "Kubernetes": 5, "AWS": 4, "Git": 4,
                "Python": 3, "Linux": 4, "CI/CD": 4
            }
        }

        self.nlp = spacy.load("en_core_web_sm")
        self.skill_variations = {
            "ML": "Machine Learning",
            "DL": "Deep Learning",
            "JS": "JavaScript",
            "DB": "Database",
            "AI": "Artificial Intelligence",
            "CV": "Computer Vision",
            "DS": "Data Science"
        }
        self.skill_patterns = self._create_skill_patterns()

        # Add EntityRuler only once
        ruler = self.nlp.add_pipe("entity_ruler", before="ner", config={"overwrite_ents": True})
        ruler.add_patterns(self.skill_patterns)

    def _create_skill_patterns(self) -> List[Dict]:
        """Create spaCy entity ruler patterns for skill extraction"""
        patterns = []
        for skill in self.admin_skills:
            parts = skill.split()
            patterns.append({"label": "SKILL", "pattern": [{"LOWER": part.lower()} for part in parts]})

        for abbr, full in self.skill_variations.items():
            patterns.append({"label": "SKILL", "pattern": [{"LOWER": abbr.lower()}]})

        return patterns

    def extract_text_from_uploaded_file(self, file_content: io.BytesIO) -> str:
        file_start = file_content.read(4)
        file_content.seek(0)

        if file_start == b'%PDF':
            try:
                doc = fitz.open("pdf", file_content.read())
                return "\n".join([page.get_text() for page in doc])
            except Exception as e:
                raise ValueError(f"PDF parsing failed: {str(e)}")

        file_content.seek(0)
        try:
            doc = Document(file_content)
            return "\n".join([para.text for para in doc.paragraphs])
        except:
            pass

        file_content.seek(0)
        try:
            return file_content.read().decode('utf-8', errors='ignore')
        except Exception as e:
            raise ValueError(f"File parsing failed: {str(e)}")

    def extract_skills(self, text: str) -> Tuple[Set[str], Dict[str, Set[str]]]:
        doc = self.nlp(text)
        unique_skills = set()
        project_skills = defaultdict(set)
        current_project = "General Experience"

        for sent in doc.sents:
            if "project" in sent.text.lower() or "experience" in sent.text.lower():
                current_project = sent.text[:100].strip()

            for ent in sent.ents:
                if ent.label_ == "SKILL":
                    normalized = self._normalize_skill(ent.text)
                    if normalized:
                        unique_skills.add(normalized)
                        project_skills[current_project].add(normalized)

        return unique_skills, project_skills

    def _normalize_skill(self, skill_text: str) -> Optional[str]:
        skill_text = skill_text.strip().lower()
        # Match from variations
        if skill_text.upper() in self.skill_variations:
            return self.skill_variations[skill_text.upper()]
        # Match from admin_skills
        for known in self.admin_skills:
            if known.lower() in skill_text:
                return known
        return None

    def calculate_score(self, resume_text: str, target_job: Optional[str] = None) -> Dict:
        unique_skills, project_skills = self.extract_skills(resume_text)
        relevant_skills = self.job_requirements.get(target_job, self.admin_skills)

        base_score = sum(relevant_skills.get(skill, 0) for skill in unique_skills)

        skill_project_count = defaultdict(int)
        for skills in project_skills.values():
            for skill in skills:
                skill_project_count[skill] += 1

        diversity_bonus = sum(
            (count - 1) * relevant_skills.get(skill, 0) * self.SKILL_DIVERSITY_WEIGHT
            for skill, count in skill_project_count.items()
            if count > 1
        )

        total_score = base_score + diversity_bonus
        max_possible = sum(relevant_skills.values()) * self.MAX_SCORE_MULTIPLIER
        final_score = min(100, round((total_score / max_possible) * 100, 1))

        matched = {
            skill: relevant_skills[skill]
            for skill in unique_skills
            if skill in relevant_skills
        }

        missing = {
            skill: weight
            for skill, weight in relevant_skills.items()
            if skill not in unique_skills and weight >= 3
        }

        recommendations = self._generate_recommendations(unique_skills, project_skills, target_job, final_score)

        return {
            "score": final_score,
            "matched_skills": dict(sorted(matched.items(), key=lambda x: -x[1])),
            "missing_skills": dict(sorted(missing.items(), key=lambda x: -x[1])),
            "recommendations": recommendations,
            "target_job": target_job or "General",
            "projects": {k: list(v) for k, v in project_skills.items()}
        }

    def _generate_recommendations(
        self,
        skills: Set[str],
        project_skills: Dict[str, Set[str]],
        target_job: Optional[str],
        score: float
    ) -> List[str]:
        recommendations = []
        relevant = self.job_requirements.get(target_job, self.admin_skills)

        missing = set(relevant.keys()) - skills
        if missing:
            top_missing = sorted(missing, key=lambda k: relevant[k], reverse=True)[:3]
            recommendations.append(f"Consider adding experience with: {', '.join(top_missing)}.")

        single_use = [s for s in skills if sum(s in ps for ps in project_skills.values()) == 1]
        if single_use:
            recommendations.append(
                "Some skills only appear in one context. Consider demonstrating "
                f"{', '.join(single_use[:3])} in multiple projects."
            )

        if len(project_skills) < 2:
            recommendations.append("Highlight more projects/work experiences to show skill diversity.")

        if score < 70:
            recommendations.append("Increase quantifiable achievements (e.g., 'Improved performance by 30%').")

        if score < 60:
            recommendations.append("Reorganize resume to better highlight technical skills near the top.")

        return recommendations
