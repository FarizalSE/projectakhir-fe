import React,{useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../utils/constants"; // Adjust the import path as necessary

const CreateUser = () => {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        console.log("Tombol di Tekan");

        try {
            await axios.post(`${API_BASE_URL}/register`, {name, email, password, role});
            console.log({msg:"Data berhasil ditambahkan"});
            Navigate('/');
        } catch (error) {
            console.log(error);
            console.log("Data tidak berhasil ditambahkan");
        }
    }

    return (
        <section className="section">
            <div className="container">
                <div className="column is-half is-offset-one-quarter">
                    <h1 className="title has-text-centered">Register Akun</h1>
                    <form onSubmit={saveUser}>
                        <div className="field">
                            <label className="label">Nama</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Nama lengkap"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="example@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Role</label>
                            <div className="control">
                                <div className="select is-fullwidth">
                                    <select
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Role</option>
                                        <option value="male">petugas</option>
                                        <option value="pengawas">pengawas</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-primary is-fullwidth">
                                    Daftar
                                </button>
                                <br />
                                <Link to="/" className="button is-light is-fullwidth">
                                    Sudah punya akun? Login
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
export default CreateUser;
