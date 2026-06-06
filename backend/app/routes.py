import io
from flask import Blueprint, request, jsonify
from app.analyzer import ResumeAnalyzer
from app.detector import JobFenceDetector, extract_text_from_url

routes = Blueprint('routes', __name__)
analyzer = ResumeAnalyzer()
detector = JobFenceDetector()

@routes.route('/', methods=['GET'])
def home():
    return "JobFence AI backend is running!"

@routes.route('/analyze', methods=['POST'])
def analyze_resume():
    target_job = request.form.get('target_job', None)
    job_text = ""

    # Check if a file was uploaded
    if 'file' in request.files and request.files['file'].filename != '':
        file = request.files['file']
        file_content = file.read()
        job_text = analyzer.extract_text_from_uploaded_file(io.BytesIO(file_content))
    # Check if raw text was sent via form data
    elif 'text' in request.form and request.form['text'].strip() != '':
        job_text = request.form['text']
    # Check if a url was sent via form data
    elif 'url' in request.form and request.form['url'].strip() != '':
        url = request.form['url']
        job_text = extract_text_from_url(url)
    else:
        # Check if the payload is JSON
        json_data = request.get_json(silent=True)
        if json_data:
            target_job = json_data.get('target_job', target_job)
            if json_data.get('text'):
                job_text = json_data['text']
            elif json_data.get('url'):
                url = json_data['url']
                job_text = extract_text_from_url(url)

        if not job_text:
            return jsonify({"error": "No file, text, or url provided"}), 400

    # Run 3-tier fraud detection
    result = detector.analyze(job_text, target_job)

    return jsonify(result)


