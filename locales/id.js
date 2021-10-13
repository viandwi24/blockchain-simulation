export default {
  nav: {
    new: 'Baru',
    edit: 'Edit',
    save: 'Simpan',
  },
  other: {
    to: 'Untuk',
    from: 'Dari',
    amount: 'Jumlah',
  },
  menu: {
    blocks: 'Blok',
    wallets: 'Dompet',
    pending: 'Transaksi Menunggu',
    newTransaction: 'Buat Transaksi',
    setting: 'Pengaturan',
  },
  components: {
    blocks: {
      title: 'Blok',
      description: '* Untuk membuat blok, kamu harus membuat transaksi terlebih dahulu',
      block: {
        title: 'Blok',
        genesisBlock: 'Blok Genesis',
        hash: 'Hash',
        previousBlockHash: 'Hash Blok Sebelumnya',
        timestamp: 'Timestamp',
        datetime: 'Waktu',
        nonce: 'Nonce',
        transactionCount: 'Jumlah Transaksi',
      }
    },
    wallets: {
      title: 'Dompet',
    },
    pending: {
      title: 'Transaksi Menunggu',
      description: '* Mulai menambang untuk memasukan semua transaksi menunggu ini ke blok baru',
      loading: 'Memuat',
      noTransactions: 'Tidak ada transaksi yang ditampilkan',
      miningInProgress: 'Menambang blok',
      noteInProgress: 'Kamu dapat membuka Console / Dev Panel di browser untuk melihat apa yang terjadi...',
      startMining: 'Mulai menambang',
      visualizer: {
        title: 'Visualisasi Menambang',
        newBlockCandidate:  'Calon Blok Baru',
        hashRules:  'Aturan Hash',
        generatedHash:  'Hasil Hash',
        timeElapsed:  'Waktu Berlalu',
        powDifficulty: 'Kesulitan PoW',
      },
      dialog: {
        title: 'Sebelum Menambang',
        text: 'menyarankan Kamu untuk membuka konsol javascript / panel dev di browser Anda, untuk melihat simulasi apa yang terjadi saat menambang.',
        next: 'Ok sudah',
        prev: 'Tidak usah'
      }
    },
    newTransaction: {
      title: 'Transaksi Baru',
      description: '* Transaksi yang anda buat akan masuk ke Transaksi Menunggu terlebih dahulu',
      createTransaction: 'Buat Transaksi',
    },
    setting: {
      title: 'Pengaturan',
      difficulty: 'Tingkat kesulitan Proof of Work',
      difficultyDescription: '* Mengatur seberapa sulit menemukan hash yang cocok saat menambang',
      miningReward: 'Hadiah Mining',
      miningRewardDescription: '* Berapa banyak "koin" dari miner yang akan diberikan jika sukses menambang blok',
    }
  },
  tour: {
    button: {
      next: 'Lanjutkan',
      prev: 'Kembali',
      finish: 'Selesai'
    },
    steps: {
      group1: [
        {
          title: 'Halo, Selamat datang !',
          text: 'Aplikasi ini dibuat untuk membantu Anda memahami cara blockchain digunakan dan membuat transaksi blockchain. Aku ingin membantu anda memahami cara menggunakan aplikasi ini.',
          prev: 'Tidak usah',
          next: 'Ya, bantu aku',
        },
        {
          title: 'Blokchain',
          text: 'Secara singkat, Blockchain adalah suatu teknologi meliputi konsep teknis untuk suatu sistem penyimpanan data digital. Blockchain bisa diibaratkan database juga, dimana didalamnya berisi kumpulan blok - blok, blok ini merepresentasikan satu kesatuan record. Dalam satu blok dapat berisi banyak data juga didalamnya. Blockchain sekarang sangat populer berkat digunakan dalam sistem cryptocurrency.'
        },
        {
          title: 'Blokchain',
          text: 'Ini adalah kumpulan blok yang dirantai, blok ini adalah representasi dari suatu record dalam tabel di database.'
        },
        {
          title: 'Blok Dirantai',
          text: `
            Setiap blok memiliki identitas (hash) yang mewakili data di dalamnya,
            dan setiap blok akan menyimpan identitas (hash) dari blok sebelumnya, makanya disebut Blockchain karena blok akan dirantai.
          `
        },
        {
          title: 'Genesis Blok',
          text: `
            Genesis Block adalah blok pertama atau biasa disebut blok nomor 0.
            Blok ini tidak berisi data transaksi, hanya sebagai blok pertama.
            Di dunia nyata tepatnya Bitcoin, Blok pertama ditambang langsung oleh penciptanya, Satoshi Nakamoto.
            Dan dia menyematkan pesan "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks"
          `
        },
        {
          title: 'Hash Block (1)',
          text: 'Ini adalah hash dari blok 2'
        },
        {
          title: 'Hash Block (2)',
          text: 'Blok ini juga mencatat hash dari blok sebelumnya'
        },
        {
          title: 'Hash Block (3)',
          text: 'Hasil hash dari blok 1 ini juga akan dimasukkan dalam catatan data dari blok selanjutnya yaitu blok 2'
        }
      ],
      group2: [
        {
          title: 'Dompet',
          text: `Dompet digital akan menyimpan kunci untuk akun kita, hanya akan ada kunci publik dan kunci pribadi.
          Jadi mari kita buat contoh dompet.`
        },
        {
          title: 'Buat dompet',
          text: `Untuk membuat dompet baru klik tombol ini`
        },
        {
          title: 'Isi nama',
          text: `Beri nama untuk dompet`
        },
        {
          title: 'Detail Dompet',
          text: `Anda tidak dapat mengklik dompet untuk melihat detailnya, Anda dapat melihat kunci publik dan kunci pribadi. di dunia nyata, hanya kunci publik yang dapat dibagikan, Anda harus menyimpan kunci pribadi sebaik mungkin)`
        },
      ],
      group3: [
        {
          title: 'Transaksi',
          text: `Transaksi akan mencatat data transaksi Anda, dan nantinya beberapa transaksi akan masuk ke dalam blok. Untuk itu kita transaksi dulu.`
        },
        {
          title: 'Pilih Alamat Tujuan',
          text: `Anda harus menuliskan alamat tujuan dompet seseorang`
        },
      ],
      group4: [
        {
          title: 'Transaksi Tertunda',
          text: `
          Transaksi yang terjadi tidak akan langsung masuk ke blok, akan masuk ke antrian pending.
          Untuk dapat memverifikasi transaksi dan memberikan hash untuk blok berikutnya dibutuhkan kerja ekstra, ini disebut penambangan.
          Jadi mari kita mulai menambang.
          `
        },
        {
          title: 'Bukti Kerja',
          text: `
          Ini namanya Proof of Work, untuk memastikan transaksi yang ada harus valid, dikirim oleh orang yang valid dan dana yang valid juga.
          Sehingga penambang diperlukan untuk melakukan penambangan dengan sumber daya komputasi mereka. Penambang harus mengacak hash untuk mendapatkan hash yang sesuai dengan kebutuhan mereka
          Karena hash tidak dapat diprediksi, hash akan terus diacak sampai benar-benar terpecahkan.
          `
        },
        {
          title: 'Blok Baru',
          text: `
          Sekarang, Blok baru telah berhasil ditambahkan.
          `
        },
        {
          title: 'Hash Baru',
          text: `
          Ini adalah hash yang dihasilkan dari bukti kerja sebelumnya.
          Hash ini berisi data yang terdapat dalam transaksi, ditambah timestamp, dan ditambah dengan nonce maka data tersebut akan di hash.
          Oleh karena itu jika data diubah, maka hash tidak akan cocok dan dianggap tidak valid.
          `
        },
        {
          title: 'Hash Sebelumnya',
          text: `
          Jangan lupa untuk menambahkan hash dari blok sebelumnya.
          `,
        },
        {
          title: 'Nonce',
          text: `
          Nonce adalah angka yang ditambahkan ke hash untuk memastikan bahwa hash itu unik.
          Nonce adalah nomor acak yang ditambahkan saat menambang, berguna untuk menemukan hash yang cocok.
          Karena ketika metode hash sedang berjalan, untuk mendapatkan hash yang lebih berbeda, kami menambahkan angka acak di dalamnya setiap kali kami mencoba.
          Dalam simulasi ini, Nonce tidak acak, tetapi Nonce dimulai dari 0 dan akan bertambah hingga hash ditemukan.
          `,
        },
        {
          title: 'Detail Blok',
          text: `
          Body of block, dapat berisi lebih dari satu transaksi. Dalam hal ini ada dua transaksi.
          `,
        },
        {
          title: 'Tanda Tangan',
          text: `
          Kami juga menambahkan tanda tangan, tanda tangan adalah kalimat hash yang dihasilkan dari isi transaksi dengan kunci pribadi pengirim.
          Dengan begitu kami dapat memastikan bahwa transaksi ini valid dari pengirim.
          `,
        },
        {
          title: 'Hadiah Penambangan',
          text: `
          pada transaksi kedua disini adalah mining rewards. sebagai hadiah untuk para penambang yang telah menambang kami akan memberi mereka hadiah koin.
          jadi dalam simulasi ini kami juga menambahkan transaksi sistem ke blok ini.
          `,
        },
        {
          title: 'Selesai!',
          text: `
          Terima kasih telah mengikuti pemandu wisata kali ini! Bersenang-senang dan semoga harimu menyenangkan!
          `,
        },
      ]
    }
  },
}
