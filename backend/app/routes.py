import io
from flask import Blueprint, request, jsonify
from app.analyzer import ResumeAnalyzer

routes = Blueprint('routes', __name__)
analyzer = ResumeAnalyzer()

@routes.route('/', methods=['GET'])
def home():
    return "Resume AI backend is running!"

@routes.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    target_job = request.form.get('target_job', None)

    file_content = file.read()
    resume_text = analyzer.extract_text_from_uploaded_file(io.BytesIO(file_content))
    result = analyzer.calculate_score(resume_text, target_job)

    return jsonify(result)
