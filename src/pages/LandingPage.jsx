/* eslint-disable no-unused-vars */
import React from 'react';
import about from '../assets/img/about.png';
import heroPic from "../assets/img/Icon.png"
import member1 from '../assets/img/maria.png';
import member2 from '../assets/img/akmal.png'
import member3 from '../assets/img/surya.png';
import { LogOut, reset } from '../features/authSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/css/landing-page.css';


const LandingPage = () => {

  const nama = 'Dwi Aji';

  return (
  // navbar 
    <div className="container">
      <nav className="navbar navbar-expand-lg bg-light fixed-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand gradient-text fw-bold" to="/">
            <i className="fa-solid fa-repeat"></i> Cassava Super
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">DASHBOARD</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">ABOUT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#stakeholder">STACKHOLDER</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team">TEAM</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">CONTACT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tracebility">TRACEBILITY</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* hero section  */}
      <section id='hero' className="py-5">
        <div className="px-5 pb-5">
          <div className="row gx-5 align-items-center">
            <div className="col-xxl-5">
              <div className="text-center text-xxl-start">
                <h1 className="display-3 fw-bolder gradient-text"><span className="text-gradient d-inline">Cassava Super</span>
                </h1>
                <p>Bisnis jual beli mu sangat menguntungkan ayo bergabung disini, gratis lho!</p>
                <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                  <NavLink className="btn btn-outline-danger log-in-button btn-lg px-5 py-3 fs-6 fw-bolder" to="login.html"><i
                      className="fa-solid fa-user "></i>Log
                    In</NavLink>
                </div>
              </div>
            </div>
            <div className="col-xxl-7">
              <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                <div className="profile bg-gradient-primary-to-secondary">
                  <img className="profile-img img-fluid" src={heroPic} alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* services  */}
      <section id='services' className='featured-services justfify-content-center text-center'>
         <div className="section-title mt-5">
            <h2 className="gradient-text">We Are Provide Some Services</h2>
            <p> TELSA (Traceability Sawit) Super Apps adalah sebuah platfrom aplikasi yang memiliki fokus pada pengelolaan
              rantai pasok yang mencakup, pasokan TBS, transportasi, pemrosesan utama dan lebih lanjut hingga menghasilkan
              Crude Palm Oil (CPO) berbasis konsep Blockchain</p>
          </div>
        <div className="row featured-services mt-2 gx-5 my-5" data-aos="fade-up">
          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
              <div className="icon"><i className="fas fa-heartbeat"></i></div>
              <h4 className="title"><NavLink className='service-link' to="">Rantai Pasok</NavLink></h4>
              <p className="description">memastikan seluruh rantai pasoknya terdiri dari minyak kelapa sawit yang berasal dari sumber yang bertanggung jawab.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
              <div className="icon"><i className="fas fa-wind"></i></div>
              <h4 className="title"><NavLink to="" className='service-link'>Blockchain Technology</NavLink></h4>
              <p className="description">mekanisme basis data lanjutan yang memungkinkan berbagi informasi secara transparan dalam jaringan bisnis. .</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
              <div className="icon"><i className="fas fa-trowel-bricks"></i></div>
              <h4 className="title"><NavLink to="" className='service-link' >Model Konvensional</NavLink></h4>
              <p className="description">Seluruh stakeholder yang terkait tidak memiliki data satu sama lain dan tidak terhubung antar bagian. </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
              <div className="icon"><i className="fas fa-dna"></i></div>
              <h4 className="title"><NavLink to="" className='service-link'>Model Digital</NavLink></h4>
              <p className="description">Seluruh stakeholder mempunyai data satu sama lain dalam proses ketertelusuran hasil CPO</p>
            </div>
          </div>
        </div>
      </section>


      <section id="cta" className="cta mb-3">
        <div className="cta-content" data-aos="zoom-in">
          <div className="text-center">
            <h3>Ingin men - tracing produk CPO anda?</h3>
            <p>Silahkan meng - klik dibawah ini</p>
            <NavLink className="cta-btn scrollto" style={{ textDecoration: 'none' }}  to="">Trace CPO Anda!</NavLink>
          </div>
      </div>
     </section>

      {/* about  */}
      <section id="about" className="about">
          <div className="section-title">
            <h2 className="gradient-text">About Us</h2>
            <p> TELSA (Traceability Sawit) Super Apps adalah sebuah platfrom aplikasi yang memiliki fokus pada pengelolaan
              rantai pasok yang mencakup, pasokan TBS, transportasi, pemrosesan utama dan lebih lanjut hingga menghasilkan
              Crude Palm Oil (CPO) berbasis konsep Blockchain</p>
          </div>

          <div className="row">
            <div className="col-lg-6" data-aos="fade-right">
              <img src={about} className="img-fluid" alt="" />
            </div>
            <div className="col-lg-6 pt-4 pt-lg-0 content" data-aos="fade-left">
              <h3 className="gradient-text">Information</h3>
              <p>
              Bisnis jual beli mu sangat menguntungkan 
              ayo bergabung disini, gratis lho!
              </p>
              <ul>
                <li><i className="fa-solid fa-circle-check"></i> visibilitas dalam transfer bahan pasokan</li>
                <li><i className="fa-solid fa-circle-check"></i> transparansi dalam hasil crude palm oil</li>
                <li><i className="fa-solid fa-circle-check"></i> traceability dalam menulusuri bahan baku TBS</li>
              </ul>
            </div>
          </div>
      </section>

      {/* counts  */}
      <section id="counts" className="counts">
        <div data-aos="fade-up">
          <div className="row no-gutters">
            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
              <div className="count-box mt-3">
              <h1 data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter bg-young-grey d-inline-block p-3"><strong>10</strong></h1>
                <p><strong>Data Approved</strong></p>
                <NavLink to="#"><i className="fa-solid fa-arrow-right"></i></NavLink>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
              <div className="count-box mt-3">
              <h1 data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter bg-young-grey d-inline-block p-3"><strong>10</strong></h1>
                <p><strong>Data On Process</strong></p>
                <NavLink to="#"><i className="fa-solid fa-arrow-right"></i></NavLink>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
              <div className="count-box mt-3">
              <h1 data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter bg-young-grey d-inline-block p-3"><strong>10</strong></h1>     
                <p><strong>Jumlah Data</strong></p>
                <NavLink to="#"><i className="fa-solid fa-arrow-right"></i></NavLink>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
              <div className="count-box mt-3">
              <h1 data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter bg-young-grey d-inline-block p-3"><strong>10</strong></h1>      
              <p><strong>Data Views</strong></p>
                <NavLink to="#"><i className="fa-solid fa-arrow-right"></i></NavLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* stakeholder  */}
      <section id="stakeholder" className="services services">
        <div  data-aos="fade-up">
          <div className="section-title">
            <h2 className='gradient-text'>Stakeholder</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon"><i className="fas fa-wheat-awn"></i></div>
              <h4 className="title"><NavLink to="" style={{ textDecoration: "none" }}>Kebun</NavLink></h4>
              <p className="description">Stakeholder kebun bagian pertama dalam proses ketertelusuran bahan baku crude palm oil. Mulai dari memanen Tandan Buah Segar hingga mengirim produk TBS tersebut ke stakeholder logistik</p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="200">
              <div className="icon"><i className="fas fa-truck-droplet"></i></div>
              <h4 className="title"><NavLink to=""  style={{ textDecoration: "none" }}>Logistik</NavLink></h4>
              <p className="description">Stakeholder logistik menjadi garda terdepan untuk mengirimkan produk tandan buah segar ke pabrik untuk diolah menjadi crude palm oil</p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="300">
              <div className="icon"><i className="fas fa-building"></i></div>
              <h4 className="title"><NavLink to="" style={{ textDecoration: "none" }}>Pabrik</NavLink></h4>
              <p className="description">Stakeholder pabrik mengolah tandan buah segar melalui beberapa station seperti penimbangan, perebusan, pemurnian, pengempaan dan lain lain </p>
            </div>
          </div>
        </div>
       </section>

       {/* teams  */}
      <section id="teams" className="teams section-bg">
        <div data-aos="fade-up">
          <div className="section-title">
            <h2 className='gradient-text'>Teams</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6-d-flex align-items-stretch">
              <div className="member" data-aos="fade-up" data-aos-delay="200">
                <div className="member-img">
                  <img src={member1} className="img-fluid" alt=""/>
                </div>
                <div className="member-info">
                  <h4>Maria Anggelika</h4>
                  <span>Back End</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6-d-flex align-items-stretch">
              <div className="member" data-aos="fade-up" data-aos-delay="200">
                <div className="member-img">
                  <img src={member2} className="img-fluid" alt=""/>
                </div> 
                <div className="member-info">
                  <h4>Akmal Rahim</h4>
                  <span>Front End</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6-d-flex align-items-stretch">
              <div className="member" data-aos="fade-up" data-aos-delay="200">
                <div className="member-img">
                  <img src={member3} className="img-fluid" alt=""/>
                </div>
                <div className="member-info">
                  <h4>M. Surya Rahman</h4>
                  <span>Testing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* question  */}
      <section id="faq" class="faq section-bg">
        <div data-aos="fade-up">
          <div class="section-title">
            <h2 className='gradient-text'>Frequently Asked Questioins</h2>
            <p></p>
          </div>
          <ul class="faq-list">
            <li>
              <div data-bs-toggle="collapse" class="collapsed question" href="#faq1">Ingin menggunakan jasa telsa super apps untuk perusahaan anda? <i class="fa-solid fa-chevron-down icon-show"></i><i class="fa-solid fa-chevron-down icon-close"></i></div>
              <div id="faq1" class="collapse" data-bs-parent=".faq-list">
                <p>
                  hubungi kontak yang tersedia untuk menggunakan jasa telsa super apps untuk implementasi web apps pada perusahaan anda
                </p>
              </div>
            </li>
            <li>
              <div data-bs-toggle="collapse" href="#faq2" class="collapsed question"> Cara tracing prdouk CPO? <i class="fa-solid fa-chevron-down icon-show"></i><i class="fa-solid fa-chevron-down icon-close"></i></div>
              <div id="faq2" class="collapse" data-bs-parent=".faq-list">
                <p>
                  Masukan kode CPO anda, kemudian akan muncul data traceability Crude Palm Oil anda
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
