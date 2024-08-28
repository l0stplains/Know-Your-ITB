
############################
######## IMPORTS ##########
##########################
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import os

# Create Flask App
app = Flask(__name__)

@app.route('/api/python', methods=['GET'])
def index():
    return "Hello, World!"

# Create API routing call
@app.route('/api/python/predict', methods=['POST'])
def predict():
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
               'Gajah Ngomik ITB', 'Genshiken',
               'Kelompok Studi Ekonomi dan Pasar Modal ITB (KSEP)', 'Aksantara ITB',
               'Ganesha Model United Nations Club', 'Pramuka ITB', 'AIESEC in ITB',
               'KOKESMA ITB (Koperasi Kesejahteraan Mahasiswa ITB)', 'Pelita Muda ITB',
               'Techno Entrepreneur Club ITB',
               'Keluarga Mahasiswa Pecinta Alam Ganesha', 'Unit Robotika ITB (URO)',
               'Resimen Mahasiswa Mahawarman Batalyon I/ITB', 'U-Green ITB',
               'Unit Otomotif Rakata ITB', 'Solve It ITB',
               'Amateur Radio Club – ARC ITB',
               'Perkumpulan Studi Ilmu Kemasyarakatan – PSIK ITB',
               'Majalah Ganesha – Kelompok Studi Sejarah Ekonomi Politik ITB',
               'Institut Sosial Humaniora Tiang Bendera – ISH TiBen ITB',
               'Liga Film Mahasiswa (LFM)', 'Radio Kampus ITB', '8EH Radio ITB',
               'Pers Mahasiswa ITB', 'Boulevard ITB',
               'Ganesha Interactive Media (GIM)', 'Cerberus']

    feat_data = request.json

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

    df = pd.DataFrame(final_features)
    df = df.reindex(columns=features)

    model = joblib.load(os.getcwd() + "\\backend\\ukm.joblib")
    prediction = list(model.predict_proba(df))
    sorted_categories = np.argsort(prediction[3])[:-6:-1]

    final_results = []
    for i in range(5):
        final_results.append({"name": classes[sorted_categories[i]],
                              "value": float(prediction[3][sorted_categories[i]])})

    return jsonify({'results': final_results})


if __name__ == '__main__':
    app.run(debug=True)
