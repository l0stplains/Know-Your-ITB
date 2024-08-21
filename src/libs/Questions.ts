interface Question {
  type: string;
  question: string;
  choices: string[];
}

const themeQuestions: {[index:string]: Question[]} = {
  ukm: [
    {
      type: "multiple",
      question: "Apa yang kamu sukai?",
      choices: [
        "Religi",
        "Olahraga",
        "Kesenian / Kreatif",
        "Akademik / Lomba",
        "Sosial",
      ],
    },
    {
      type: "scale",
      question: "Seberapa tertarik anda ke bidang kebudayaan",
      choices: [
        "Tidak tertarik",
        "Sangat tertarik",
      ],
    },
    {
      type: "scale",
      question: "Apakah anda lebih tertarik ke budaya lokal atau luar",
      choices: [
        "Budaya lokal",
        "Budaya luar",
      ],
    },
    {
      type: "multiple",
      question: "Media budaya yang paling diminati",
      choices: [
        "Musik",
        "Sastra",
        "Tarian",
        "Visual / Ilustrasi",
        "Teater / Film",
        "Pers / Radio",
      ],
    },
    {
      type: "scale",
      question: "Anda lebih suka beraktifitas di luar ruangan",
      choices: [
        "Sangat tidak setuju",
        "Sangat setuju",
      ],
    },
    {
      type: "scale",
      question: "Anda suka berkegiatan dengan banyak orang",
      choices: [
          "Sangat tidak suka",
          "Sangat suka",
      ],
    },
    {
      type: "scale",
      question: "Anda memiliki ambisi untuk mengikuti banyak lomba",
      choices: [
          "Tidak ingin",
          "Sangat ingin",
      ],
    },
    {
      type: "scale",
      question: "Anda merupakan orang yang kuat atau senang untuk melakukan aktifitas fisik",
      choices: [
          "Kurang kuat",
          "Sangat kuat",
      ],
    },
    {
      type: "scale",
      question: "Anda merupakan orang yang kreatif",
      choices: [
          "Mengikuti hal yang sudah ada",
          "Suka membuat hal baru",
      ],
    },
    {
      type: "scale",
      question: "Apa landasan Anda dalam membuat keputusan?",
      choices: [
        "Logika",
        "Perasaan",
      ],
    },
    {
      type: "scale",
      question: "Anda menyukai hal yang berhubungan dengan teknologi",
      choices: [
        "Sangat tidak suka",
        "Sangat suka",
      ],
    },
    {
      type: "scale",
      question: "Anda suka mencoba hal baru",
      choices: [
        "Suka dengan hal yang familiar",
        "Suka mencari tantangan baru",
      ],
    },
    {
      type: "scale",
      question: "Anda lebih suka bekerja secara?",
      choices: [
        "Individu",
        "Tim",
      ],
    },
    {
      type: "scale",
      question: "Anda ingin berkarya / berprojek bersama-sama",
      choices: [
        "Tidak ingin",
        "Sangat ingin",
      ],
    },
    {
      type: "scale",
      question: "Anda lebih memilih soft atau hard skill",
      choices: [
        "Soft skill",
        "Hard skill",
      ],
    },
    {
      type: "scale",
      question: "Anda suka Public Speaking",
      choices: [
        "Tidak suka",
        "Sangat suka",
      ],
    },
    {
      type: "scale",
      question: "Anda suka melakukan kegiatan pengabdian masyarakat",
      choices: [
        "Tidak suka",
        "Sangat suka",
      ],
    },
    {
      type: "scale",
      question: "Anda tertarik bertemu orang-orang baru",
      choices: [
        "Tidak tertarik",
        "Sangat tertarik",
      ],
    },
    {
      type: "scale",
      question: "Anda menyukai alam atau berkegiatan di alam",
      choices: [
        "Tidak suka",
        "Sangat suka",
      ],
    },
    {
      type: "scale",
      question: "Anda tertarik dengan bisnis atau ekonomi",
      choices: [
        "Tidak tertarik",
        "Sangat tertarik",
      ],
    },
    {
      type: "scale",
      question: "Anda tertarik dengan kegiatan aktivisme",
      choices: [
        "Tidak tertarik",
        "Sangat tertarik",
      ],
    },
    {
      type: "scale",
      question: "Anda tertarik dengan isu sosial politik",
      choices: [
        "Tidak tertarik",
        "Sangat tertarik",
      ],
    },
  ],
  hmif: [

  ]
};

export default themeQuestions;
