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
    target_job = request.form.get('target_job', None)

    if 'file' in request.files and request.files['file'].filename != '':
        file = request.files['file']
        file_content = file.read()
        resume_text = analyzer.extract_text_from_uploaded_file(io.BytesIO(file_content))
    elif 'text' in request.form:
        resume_text = request.form['text']
    else:
        return jsonify({"error": "No file or text uploaded"}), 400

    result = analyzer.calculate_score(resume_text, target_job)

    return jsonify(result)

