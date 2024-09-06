
############################
######## IMPORTS ##########
##########################
from flask import Flask, request, jsonify
import joblib
import numpy as np
import os

# Create Flask App
app = Flask(__name__)

@app.route('/api/', methods=['GET'])
def index():
    return "Hello, World!"

# Create API routing call
@app.route('/api/predict', methods=['POST'])
def predict():
    theme = request.headers.get('theme')
    if theme == 'ukm':
        feat_data = request.json
        return predictUKM(feat_data)
    elif theme == 'hmif':
        feat_data = request.json
        return predictHMIF(feat_data)
    else:
        return jsonify({'error': 'Invalid theme'})

def predictHMIF(feat_data):
    scoring_metrics = {"General Secretariat": 0,
                   "Creative & Branding": 0,
                   "Tech Issues & Exploration": 0,
                   "Welfare & Academics": 0,
                   "External & Relations": 0,
                   "Internal": 0,
                   "People": 0,
                   "Inkubator IT": 0,
                   "Representative & Supervisory Council (DPP)": 0}

    question_score = { "Kamu lebih suka People work atau Technical work?": [[7, 5, 2, 7, 10, 10, 10, 4, 6], [4, 2, 10, 4, 2, 2, 2, 10, 3]],
                        "Kamu suka creative work?": [[3, 10, 5, 6, 7, 6, 6, 4, 2], [6, 1, 2, 4, 4, 4, 4, 4, 3]],
                        "Kamu suka kegiatan di belakang meja atau ketemu banyak orang?": [[5, 3, 8, 4, 1, 1, 1, 7, 4], [6, 7, 3, 7, 8, 8, 10, 4, 5]],
                        "Kamu suka academic related atau non-academic y/n": [[6, 3, 10, 5, 2, 4, 2, 10, 3], [6, 7, 2, 5, 7, 6, 7, 2, 7]],
                        "Kamu suka public speaking?": [[8, 9, 5, 6, 10, 7, 8, 4, 5], [2, 1, 5, 4, 0, 3, 2, 6, 5]],
                        "Kamu mau serius atau have fun?": [[7, 1, 8, 6, 4, 3, 4, 7, 5], [3, 9, 2, 4, 6, 7, 6, 3, 5]]}
    
    for question in feat_data:
        if question in question_score:
            val = feat_data[question] / 5
            if feat_data[question] == 'y':
                score([i * val for i in question_score[question][0]], scoring_metrics)
            else:
                score([i * (1 - val) for i in question_score[question][1]], scoring_metrics)

    sorted_score = sorted(scoring_metrics.items(),key=lambda x:x[1],reverse=True)[:5]

    final_results = []
    for res in sorted_score:
        final_results.append({"name": res[0],
                              "value": res[1]})
        
    return jsonify({'results': final_results}) 


def score(added, metric):
    i = 0
    for key in metric:
        metric[key] += added[i]
        i += 1


def predictUKM(feat_data):
    features = ['Seberapa tertarik anda ke bidang kebudayaan',
                'Apakah anda lebih tertarik ke budaya lokal atau luar',
                'Anda lebih suka beraktifitas di luar ruangan',
                'Anda suka berkegiatan dengan banyak orang',
                'Anda memiliki ambisi untuk mengikuti banyak lomba',
                'Anda merupakan orang yang kuat atau senang untuk melakukan aktifitas fisik',
                'Anda merupakan orang yang kreatif',
                'Apa landasan Anda dalam membuat keputusan?',
                'Anda menyukai hal yang berhubungan dengan teknologi',
                'Anda suka mencoba hal baru', 'Anda lebih suka bekerja secara?',
                'Anda ingin berkarya / berprojek bersama-sama',
                'Anda lebih memilih soft atau hard skill', 'Anda suka Public Speaking',
                'Anda suka melakukan kegiatan pengabdian masyarakat',
                'Anda tertarik bertemu orang-orang baru',
                'Anda menyukai alam atau berkegiatan di alam',
                'Anda tertarik dengan bisnis atau ekonomi',
                'Anda tertarik dengan kegiatan aktivisme',
                'Anda tertarik dengan isu sosial politik', 'Media budaya yang paling diminati_Pers / Radio',
                'Media budaya yang paling diminati_Tarian',
                'Media budaya yang paling diminati_Teater / Film',
                'Media budaya yang paling diminati_Visual / Ilustrasi',
                'Jenis kegiatan apa yang paling anda suka?_Kesenian / Kreatif',
                'Jenis kegiatan apa yang paling anda suka?_Olahraga',
                'Jenis kegiatan apa yang paling anda suka?_Religi',
                'Jenis kegiatan apa yang paling anda suka?_Sosial']

    classes = ['Unit Kebudayaan Luar ( UKJ / KCC ITB)',
               'Unit Kebudayaan Lokal ( UKSS / UKT / UKSU / LSS / dll)',
               'Paduan Suara Mahasiswa (PSM)', 'Marching Band Waditra Ganesha (MBWG)',
               'Keluarga Paduan Angklung (KPA)', 'Lingkar Sastra (LS)',
               'ITB Dance and Performance Art Community (INFINITY ITB)', 'ITBJazz',
               'ITB Student Orchestra (ISO)', 'Unit Rebana ITB (URI)',
               'Studi Teater Mahasiswa (STEMA)', 'APRES!', 'UKM Keagamaan',
               'UKM Olahraga',
               'Korps Sukarela Palang Merah Indonesia Institut Teknologi Bandung',
               'Gajah Ngomik ITB', 'Genshiken ITB',
               'Kelompok Studi Ekonomi dan Pasar Modal (KSEP) ITB', 'Aksantara ITB',
               'Ganesha Model United Nations Club', 'Pramuka ITB', 'AIESEC in ITB',
               'KOKESMA ITB (Koperasi Kesejahteraan Mahasiswa ITB)', 'Pelita Muda ITB',
               'Techno Entrepreneur Club (TEC) ITB',
               'Keluarga Mahasiswa Pecinta Alam Ganesha Institut Teknologi Bandung (KMPA Ganesha ITB)', 'Unit Robotika ITB',
               'Resimen Mahasiswa Mahawarman Batalyon I/ITB', 'U-Green ITB',
               'Unit Otomotif Rakata ITB', 'Solve It ITB',
               'Amateur Radio Club – ARC ITB',
               'Perkumpulan Studi Ilmu Kemasyarakatan – PSIK ITB',
               'Majalah Ganesha – Kelompok Studi Sejarah Ekonomi Politik ITB',
               'Institut Sosial Humaniora Tiang Bendera – ISH TiBen ITB',
               'Liga Film Mahasiswa (LFM)', 'Radio Kampus ITB', '8EH Radio ITB',
               'Pers Mahasiswa ITB', 'Boulevard ITB',
               'Ganesha Interactive Media (GIM) ITB', 'Cerberus']


    final_features = []
    for i in range(len(features)):
        # GA TAU CO INI NGAKALIN NYA GIMANA ;)
        if features[i] in feat_data:
            final_features.append(feat_data[features[i]])
        elif features[i] == "Media budaya yang paling diminati_Tarian" and feat_data["Media budaya yang paling diminati"] == "Tarian":
            final_features.append(1)
        elif features[i] == "Media budaya yang paling diminati_Teater / Film" and feat_data["Media budaya yang paling diminati"] == "Teater / Film":
            final_features.append(1)
        elif features[i] == "Media budaya yang paling diminati_Visual / Ilustrasi" and feat_data["Media budaya yang paling diminati"] == "Visual / Ilustrasi":
            final_features.append(1)
        elif features[i] == "Jenis kegiatan apa yang paling anda suka?_Kesenian / Kreatif" and feat_data["Jenis kegiatan apa yang paling anda suka?"] == "Kesenian / Kreatif":
            final_features.append(1)
        elif features[i] == "Jenis kegiatan apa yang paling anda suka?_Olahraga" and feat_data["Jenis kegiatan apa yang paling anda suka?"] == "Olahraga":
            final_features.append(1)
        elif features[i] == "Jenis kegiatan apa yang paling anda suka?_Religi" and feat_data["Jenis kegiatan apa yang paling anda suka?"] == "Religi":
            final_features.append(1)
        elif features[i] == "Jenis kegiatan apa yang paling anda suka?_Sosial" and feat_data["Jenis kegiatan apa yang paling anda suka?"] == "Sosial":
            final_features.append(1)
        else:
            final_features.append(0)

    # Assuming final_features is a list or array-like structure
    final_features_array = np.array(final_features)

    # Load the model
    model = joblib.load(os.path.join(os.getcwd(), "api", "newmodel.joblib"))

    # Make predictions
    prediction = list(model.predict_proba([final_features_array]))
    sorted_categories = np.argsort(prediction[0])[:-6:-1]

    final_results = []
    for i in range(5):
        final_results.append({"name": classes[sorted_categories[i]],
                              "value": float(prediction[0][sorted_categories[i]])})
        

    return jsonify({'results': final_results}) 

if __name__ == '__main__':
    app.run(debug=True)
