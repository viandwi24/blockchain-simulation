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
    }
  },
}
