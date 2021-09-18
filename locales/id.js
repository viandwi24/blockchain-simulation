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
    steps: [
      {
        title: 'Halo, Selamat datang !',
        text: 'Aplikasi ini dibuat untuk membantu Anda memahami cara blockchain digunakan dan membuat transaksi blockchain. Aku ingin membantu anda memahami cara menggunakan aplikasi ini.',
        prev: 'Tidak usah',
        next: 'Ya, bantu aku',
      }
    ]
  },
}
