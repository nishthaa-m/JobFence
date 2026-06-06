import urllib.request
import json
import re
import os
import math
from typing import Dict, Any, List, Tuple

# HTML parser to extract plain text from URLs
from html.parser import HTMLParser

class HTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self.ignore_tags = {'script', 'style', 'head', 'meta', 'link', 'nav', 'footer'}
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag

    def handle_endtag(self, tag):
        self.current_tag = None

    def handle_data(self, data):
        if self.current_tag not in self.ignore_tags:
            cleaned = data.strip()
            if cleaned:
                self.text_parts.append(cleaned)

    def get_text(self) -> str:
        return "\n".join(self.text_parts)

def extract_text_from_url(url: str) -> str:
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            html = response.read().decode('utf-8', errors='ignore')
            parser = HTMLTextExtractor()
            parser.feed(html)
            return parser.get_text()
    except Exception as e:
        print(f"Error fetching URL: {e}")
        return f"Failed to fetch content from URL: {str(e)}"


# Tier 3: Pure Python Naive Bayes Scam Classifier
class JobScamClassifier:
    def __init__(self):
        # Hand-crafted counts to serve as pre-trained weights for Naive Bayes classification
        self.scam_vocab = {
            "fee": 60, "deposit": 50, "whatsapp": 55, "telegram": 45,
            "investment": 35, "pay": 30, "urgent": 25, "easy": 30,
            "quick": 25, "cash": 35, "unlimited": 20, "refund": 25,
            "crypto": 35, "bitcoin": 30, "guaranteed": 30, "no-experience": 25,
            "commission": 20, "part-time": 12, "home-based": 20, "earn": 25,
            "registration": 40, "upfront": 30, "income": 20, "dollars": 15,
            "apply-now": 15, "whatsapp-us": 30, "no-fees": 15
        }
        self.legit_vocab = {
            "requirements": 50, "experience": 60, "degree": 40, "responsibilities": 55,
            "skills": 50, "team": 40, "development": 45, "software": 40,
            "design": 35, "full-time": 35, "qualification": 30, "preferred": 30,
            "professional": 30, "collaboration": 25, "benefits": 30, "engineering": 35,
            "analyze": 25, "data": 30, "project": 40, "management": 35,
            "bachelor": 25, "candidate": 30, "industry": 25, "description": 25
        }
        self.scam_prior = 0.5
        self.legit_prior = 0.5

    def predict_probability(self, text: str) -> float:
        """Returns the probability that the text is a SCAM (0.0 to 1.0)"""
        # Find all alphanumeric tokens
        words = re.findall(r'\b\w+\b', text.lower())
        if not words:
            return 0.5
        
        # log likelihood to avoid underflow
        scam_log_prob = math.log(self.scam_prior)
        legit_log_prob = math.log(self.legit_prior)
        
        # Vocab sizes for Laplace smoothing
        vocab_size = len(self.scam_vocab) + len(self.legit_vocab)
        total_scam_words = sum(self.scam_vocab.values()) + vocab_size
        total_legit_words = sum(self.legit_vocab.values()) + vocab_size
        
        for word in words:
            scam_count = self.scam_vocab.get(word, 0)
            scam_word_prob = (scam_count + 1) / total_scam_words
            scam_log_prob += math.log(scam_word_prob)
            
            legit_count = self.legit_vocab.get(word, 0)
            legit_word_prob = (legit_count + 1) / total_legit_words
            legit_log_prob += math.log(legit_word_prob)
            
        max_log = max(scam_log_prob, legit_log_prob)
        try:
            exp_scam = math.exp(scam_log_prob - max_log)
            exp_legit = math.exp(legit_log_prob - max_log)
            scam_prob = exp_scam / (exp_scam + exp_legit)
            return scam_prob
        except Exception:
            return 0.5


# JobFence analysis orchestrator
def load_env():
    try:
        # Look for .env in the parent directory (backend/)
        env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), '.env')
        if os.path.exists(env_path):
            with open(env_path, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and not line.startswith('#') and '=' in line:
                        key, val = line.split('=', 1)
                        os.environ[key.strip()] = val.strip()
    except Exception as e:
        print(f"Error loading manual .env: {e}")

class JobFenceDetector:
    def __init__(self):
        load_env()
        self.classifier = JobScamClassifier()
        # Default n8n URL (can be customized via environment variable)
        self.n8n_webhook_url = os.environ.get("N8N_WEBHOOK_URL", "http://localhost:5678/webhook/check-job-offer")


    def call_n8n_webhook(self, payload: Dict[str, Any]) -> Tuple[int, str, List[str]]:
        """Calls n8n webhook and falls back gracefully to a mock agent response if offline."""
        try:
            req = urllib.request.Request(
                self.n8n_webhook_url,
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'},
                method='POST'
            )
            # Short 6-second timeout so the application remains responsive if docker/n8n is offline
            with urllib.request.urlopen(req, timeout=6) as response:
                res_data = response.read().decode('utf-8')
                result = json.loads(res_data)
                
                # Check for standard output format from n8n webhook
                # Usually it could be a list of results or a dictionary
                if isinstance(result, list) and len(result) > 0:
                    result = result[0]
                
                trust_score = int(result.get("trust_score", 100))
                explanation = result.get("explanation", "The n8n Agent analyzed this job posting successfully.")
                suggestions = result.get("suggestions", "Verify details with the employer.")
                if isinstance(suggestions, str):
                    suggestions = [s.strip() for s in suggestions.split('\n') if s.strip()]
                
                return trust_score, explanation, suggestions
        except Exception as e:
            print(f"n8n webhook error or offline: {e}")
            # Dynamic fallback mock explanation/suggestions when n8n is offline
            return self._generate_mock_llm_response(payload)

    def _generate_mock_llm_response(self, payload: Dict[str, Any]) -> Tuple[int, str, List[str]]:
        """Generates a smart fallback LLM response if n8n docker container is offline."""
        text = (payload.get("text") or "").lower()
        rules_triggered = self.run_rule_based_check(payload.get("text") or "")
        
        # Calculate dynamic mock score based on rule checks
        triggered_count = len(rules_triggered)
        if triggered_count >= 3:
            trust_score = 25
            explanation = "This job offer raises critical red flags. It demands upfront registration/security fees and utilizes unofficial chat applications for core communication, which are typical characteristics of employment scams."
            suggestions = [
                "Never pay any upfront fees or deposit money for job offers.",
                "Conduct research on the company registry (GSTIN/SAN/Official Registries).",
                "Insist on formal corporate email communications rather than WhatsApp or Telegram messages."
            ]
        elif triggered_count >= 1:
            trust_score = 65
            explanation = "The job posting seems moderately suspicious due to the use of non-corporate email domains or urgent language, though no direct payment requests were detected."
            suggestions = [
                "Verify the recruiter's identity on LinkedIn or their official website.",
                "Be cautious of fast-tracked offers that skip formal background rounds."
            ]
        else:
            trust_score = 90
            explanation = "The job listing contains professional phrasing, standard job requirements, and no immediate red flags, indicating a high level of legitimacy."
            suggestions = [
                "Follow standard application procedures.",
                "Review the official company website and job portal before applying."
            ]
            
        return trust_score, explanation, suggestions

    def run_rule_based_check(self, text: str) -> List[Dict[str, Any]]:
        """Tier 2: Scan text for specific job scam red flags."""
        flags = []
        text_lower = text.lower()

        # Rule 1: Upfront Payments
        payment_keywords = [
            r"registration fee", r"security deposit", r"processing fee", 
            r"refundable deposit", r"buy equipment", r"training fee",
            r"pay first", r"upfront payment"
        ]
        payment_matches = [kw for kw in payment_keywords if re.search(kw, text_lower)]
        if payment_matches:
            flags.append({
                "rule": "upfront_payment",
                "severity": "high",
                "message": "Requests upfront fees (registration/security/training deposits), which is a common scam pattern."
            })

        # Rule 2: Unprofessional/Chat Communication
        chat_keywords = [
            r"\bwhatsapp\b", r"\btelegram\b", r"\bsignal app\b", r"\bdiscord\b"
        ]
        chat_matches = [kw for kw in chat_keywords if re.search(kw, text_lower)]
        if chat_matches:
            flags.append({
                "rule": "chat_communication",
                "severity": "medium",
                "message": "Directs communication or interviews through public chat applications (WhatsApp/Telegram)."
            })

        # Rule 3: Public Email Domain
        # Look for typical public email addresses
        email_matches = re.findall(r'[\w\.-]+@(gmail|yahoo|outlook|hotmail|protonmail|ymail)\.com', text_lower)
        if email_matches:
            flags.append({
                "rule": "public_email",
                "severity": "medium",
                "message": "Uses a free public email domain (Gmail/Yahoo) instead of a corporate domain."
            })

        # Rule 4: Unrealistic Compensation / Easy Money
        compensation_keywords = [
            r"easy money", r"quick cash", r"no experience required", 
            r"earn \$\d+ daily", r"earn \$\d+ weekly", r"high income",
            r"1 hour a day", r"no skills needed"
        ]
        comp_matches = [kw for kw in compensation_keywords if re.search(kw, text_lower)]
        if comp_matches:
            flags.append({
                "rule": "unrealistic_compensation",
                "severity": "medium",
                "message": "Promises unusually high payouts for low hours or requires zero experience/skills."
            })

        # Rule 5: Immediate Hiring / Pressure
        pressure_keywords = [
            r"immediate hiring", r"apply immediately", r"limited seats", 
            r"hiring urgently", r"start today"
        ]
        pressure_matches = [kw for kw in pressure_keywords if re.search(kw, text_lower)]
        if pressure_matches:
            flags.append({
                "rule": "urgency_pressure",
                "severity": "low",
                "message": "Uses high-pressure tactics or immediate start times to rush the application."
            })

        return flags

    def analyze(self, text: str, target_job: str = None) -> Dict[str, Any]:
        """Orchestrates Tier 1, 2, and 3 analyses and aggregates them into a heuristic score."""
        # 1. Tier 2: Rule-Based Evaluation
        rules_triggered = self.run_rule_based_check(text)
        
        # Rule-based scoring: Start at 100, penalize for each trigger
        rule_score = 100
        for flag in rules_triggered:
            if flag["severity"] == "high":
                rule_score -= 35
            elif flag["severity"] == "medium":
                rule_score -= 20
            else:
                rule_score -= 10
        rule_score = max(0, rule_score)

        # 2. Tier 3: ML Model Probability Prediction
        scam_probability = self.classifier.predict_probability(text)
        # Convert scam probability to a legitimacy trust score (0 to 100)
        ml_score = round((1.0 - scam_probability) * 100)

        # 3. Tier 1: n8n Agent Call
        payload = {
            "text": text,
            "target_job": target_job or "General"
        }
        n8n_score, explanation, suggestions = self.call_n8n_webhook(payload)

        # 4. Aggregated Heuristic Trust Score Calculation
        # Weights: n8n (40%), Rule-based (30%), ML Model (30%)
        heuristic_score = round(
            (n8n_score * 0.4) + (rule_score * 0.3) + (ml_score * 0.3)
        )
        heuristic_score = min(100, max(0, heuristic_score))

        return {
            "score": heuristic_score,
            "target_job": target_job or "General",
            "tier1_llm": {
                "score": n8n_score,
                "explanation": explanation,
                "suggestions": suggestions
            },
            "tier2_rules": {
                "score": rule_score,
                "flags": rules_triggered
            },
            "tier3_ml": {
                "score": ml_score,
                "scam_probability": round(scam_probability * 100, 1)
            }
        }
