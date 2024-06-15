import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
    const [searchId, setSearchId] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearchChange = (e) => {
        setSearchId(e.target.value);
    };

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:5000/search/${searchId}`);
            setSearchResults([response.data]); // Menyimpan hasil dalam array untuk memudahkan rendering
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Data tidak ditemukan atau terjadi kesalahan pada server.');
            setSearchResults([]);
            setLoading(false);
        }
    };

    const renderResultItem = (result) => {
        // Daftar properti yang mungkin ada dari berbagai model
        const properties = [
            'uuid', 'name', 'email', 'role', 'nohp', 'alamat', 'foto', 'url',  // Properties from Users model
            'idPengiriman', 'tanggalWaktuPengiriman', 'asal', 'tujuan', 'estimasiWaktuTiba', 'nomorPolisiKendaraan', 'jenisKendaraan', 'kapasitasAngkut', 'biayaTransportasi', 'catatanEfisiensiRute', 'kondisiPengiriman', 'catatanDariPenerima', // Properties from Logistik model
            'tanggalPenerimaan', 'beratTotalDiterima', 'evaluasiKualitas', 'catatanKualitas', 'kapasitasProduksi', 'produksiHarianTapioka', 'kualitasOutput', 'permasalahanOperasional', 'kebutuhanPerbaikan', // Properties from Pabrik model
            'idlahan', 'lokasilahan', 'luaslahan', 'statuskepemilikanlahan', 'periodeTanamMulai', 'periodeTanamSelesai', 'varietassingkong', 'estimasiproduksi', 'produksiaktual', 'catatantambahan', 'jenispupuk', 'jumlahpupuk', 'hargajual', 'totalpendapatan', 'pendapatanbersih',  // Properties from Petani model
            'tanggalPemanenan', 'statusOrder', 'varietasSingkong', 'estimasiBerat', 'estimasiHarga', 'namaLogistik', 'noHpLogistik', 'platnoLogistik', 'namaPerusahaan', 'noHpPerusahaan',
        ];

        return properties.map((property) => (
            result[property] !== undefined ? <div key={property}>{`${property.charAt(0).toUpperCase() + property.slice(1)}: ${result[property]}`}</div> : null
        ));
    };

    return (
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>Search</h2>
                    <Link to="/" className="btn btn-secondary">Back</Link>
                </div>
                <form onSubmit={handleSearchSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control mb-3"
                            placeholder="Masukkan ID untuk pencarian..."
                            value={searchId}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Cari</button>
                </form>

                {loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}

                {searchResults.length > 0 && (
                    <div>
                        <h3>Hasil Pencarian:</h3>
                        <ul className="list-group">
                            {searchResults.map((result, index) => (
                                <li key={index} className="list-group-item">
                                    {renderResultItem(result)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default Search;
