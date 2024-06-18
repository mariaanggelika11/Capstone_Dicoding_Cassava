/* eslint-disable no-unused-vars */
import React from 'react';
import about from '../assets/img/about.png';
import heroPic from "../assets/img/Icon.png"
import member1 from '../assets/img/maria.png';
import member2 from '../assets/img/akmal.png'
import member3 from '../assets/img/surya.png';
import kebun from '../assets/icons/kebun.png';
import logistik from '../assets/icons/logistik.png';
import pabrik from '../assets/icons/pabrik.png';
// import { LogOut, reset } from '../features/authSlice';
import { NavLink } from 'react-router-dom';
import '../assets/css/landing-page.css';


const LandingPage = () => {

  const nama = 'Dwi Aji';

  return (
    
 


<>
    <style jsx>{`
    body {
    padding-top: 80px;
    }

    navbar .navbar-nav .nav-link,
    .navbar-toggler-icon {
      color: black !important;
      font-size: 12px;
    }

      .container,
      .container-fluid {
        width: 100%;
        overflow-x: hidden;
      }

      .navbar {
        align-items: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        margin: 25px;
      }

      .navbar-brand {
        font-size: 18px;
        color: #CE4815;
        display: flex;
        align-items: center;
        margin: 0 auto;
        text-align: center;
      }

      .navbar-brand i {
        margin-right: 10px;
      }

      .container {
        border: #CE4815;
      }

      .nav-link {
        position: relative;
        text-decoration: none;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        display: block;
        margin-top: 5px;
        right: 0;
        background: orange;
        transition: width 0.3s ease, right 0.3s ease;
      }

      .nav-link:hover::after {
        width: 100%;
        right: 0;
      }

      .nav-link:hover {
        background: linear-gradient(90deg, #CE4815 0%, #FF8A01 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `}</style>
  <main>
    {/* navbar  */}

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
                <NavLink className="nav-link" to="/login">DASHBOARD</NavLink>
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
                <a className="nav-link" href="#contact">CONTACT</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#tracebility">TRACEBILITY</a>
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
                  <NavLink className="btn btn-outline-danger log-in-button btn-lg px-5 py-3 fs-6 fw-bolder" to="/login"><i
                      className="fa-solid fa-user "></i>Log In</NavLink>
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
            <p> Cassava Super Apps adalah sebuah platfrom aplikasi yang memiliki fokus pada pengelolaan
              rantai pasok yang mencakup, pasokan umbi singkong, transportasi, pemrosesan utama dan lebih lanjut hingga menghasilkan
              Crude Palm Oil (tepung tapioka) berbasis konsep Blockchain</p>
          </div>
        <div className="row featured-services mt-2 gx-5 my-5" data-aos="fade-up">
          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="100">
              <div className="icon"><i className="fa-solid fa-link"></i></div>
              <h4 className="title"><NavLink className='service-link' to="">Rantai Pasok</NavLink></h4>
              <p className="description">memastikan seluruh rantai pasoknya terdiri dari minyak kelapa sawit yang berasal dari sumber yang bertanggung jawab.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="200">
              <div className="icon"><i className="fa-solid fa-cube"></i></div>
              <h4 className="title"><NavLink to="" className='service-link'>Blockchain Technology</NavLink></h4>
              <p className="description">mekanisme basis data lanjutan yang memungkinkan berbagi informasi secara transparan dalam jaringan bisnis. .</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="300">
              <div className="icon"><i className="fa-solid fa-book"></i></div>
              <h4 className="title"><NavLink to="" className='service-link' >Model Konvensional</NavLink></h4>
              <p className="description">Seluruh stakeholder yang terkait tidak memiliki data satu sama lain dan tidak terhubung antar bagian. </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box" data-aos="fade-up" data-aos-delay="400">
              <div className="icon"><i className="fa-solid fa-tachograph-digital"></i></div>
              <h4 className="title"><NavLink to="" className='service-link'>Model Digital</NavLink></h4>
              <p className="description">Seluruh stakeholder mempunyai data satu sama lain dalam proses ketertelusuran hasil tepung tapioka</p>
            </div>
          </div>
        </div>
      </section>


      <section id="tracebility" className="cta mb-3">
        <div className="cta-content" data-aos="zoom-in">
          <div className="text-center">
            <h3>Ingin men - tracing produk tepung tapioka anda?</h3>
            <p>Silahkan meng - klik dibawah ini</p>
            <NavLink className="cta-btn scrollto" style={{ textDecoration: 'none' }}  to="/tracebility">Trace tepung tapioka Anda!</NavLink>
          </div>
      </div>
     </section>

      {/* about  */}
      <section id="about" className="about">
          <div className="section-title">
            <h2 className="gradient-text">About Us</h2>
            <p>Cassava Super Apps adalah sebuah platfrom aplikasi yang memiliki fokus pada pengelolaan
              rantai pasok yang mencakup, pasokan umbi singkong, transportasi, pemrosesan utama dan lebih lanjut hingga menghasilkan
              Crude Palm Oil (tepung tapioka) berbasis konsep Blockchain</p>
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
                <li><i className="fa-solid fa-circle-check"></i> traceability dalam menulusuri bahan baku umbi singkong</li>
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
        <div data-aos="fade-up">
          <div className="section-title">
            <h2 className='gradient-text'>Stakeholder</h2>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="100">
              <div className="icon"><img src={kebun} alt="kebun" style={{ width:"50%" }} /></div>
              <h4 className="title"><NavLink to="" style={{ textDecoration: "none" }}>Kebun</NavLink></h4>
              <p className="description">Stakeholder kebun bagian pertama dalam proses ketertelusuran bahan baku umbi singkong. Mulai dari memanen Tandan Buah Segar hingga mengirim produk umbi singkong tersebut ke stakeholder logistik</p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="200">
              <div className="icon"><img src={logistik} alt="logistik" style={{ width:"50%" }} /></div>
              <h4 className="title"><NavLink to=""  style={{ textDecoration: "none" }}>Logistik</NavLink></h4>
              <p className="description">Stakeholder logistik menjadi garda terdepan untuk mengirimkan produk tandan buah segar ke pabrik untuk diolah menjadi crude palm oil</p>
            </div>
            <div className="col-lg-4 col-md-6 icon-box" data-aos="zoom-in" data-aos-delay="300">
              <div className="icon"><img src={pabrik} alt="pabrik" style={{ width:"50%" }} /></div>
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
      <section id="faq" className="faq section-bg">
        <div data-aos="fade-up">
          <div className="section-title">
            <h2 className='gradient-text'>Frequently Asked Questioins</h2>
            <p></p>
          </div>
          <ul className="faq-list">
            <li>
              <div data-bs-toggle="collapse" className="collapsed question" href="#faq1">Ingin menggunakan jasa Cassava super apps untuk perusahaan anda? <i className="fa-solid fa-chevron-down icon-show"></i><i className="fa-solid fa-chevron-up icon-close"></i></div>
              <div id="faq1" className="collapse" data-bs-parent=".faq-list">
                <p>
                  hubungi kontak yang tersedia untuk menggunakan jasa Cassava super apps untuk implementasi web apps pada perusahaan anda
                </p>
              </div>
            </li>
            <li>
              <div data-bs-toggle="collapse" href="#faq2" className="collapsed question"> Cara tracing produk tepung tapioka? <i className="fa-solid fa-chevron-down icon-show"></i><i className="fa-solid fa-chevron-up icon-close"></i></div>
              <div id="faq2" className="collapse" data-bs-parent=".faq-list">
                <p>
                  Masukan kode tepung tapioka anda
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* contact  */}
      <section id="contact" className="contact">
        <div className="section-title">
          <h2 className='gradient-text'>Contact Us</h2>      
        </div>
        <div>
          <iframe
              title="Google Maps"
              style={{ border: 0, width: '100%', height: '350px' }}
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d63553.420703949225!2d105.27055501805027!3d-5.403443199999966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1669675472845!5m2!1sid!2sid"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-md-12">
                <div className="info-box">
                  <i className="fa-solid fa-map"></i>
                  <h3>Our Address</h3>
                  <p>Jl.Prof.Dr Soemantri Brodjonegoro</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4">
                  <i className="fa-solid fa-envelope"></i>
                  <h3>Email Us</h3>
                  <p>Cassava@gmail.com</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="info-box mt-4">
                  <i className="fa-solid fa-phone"></i>
                  <h3>Call Us</h3>
                  <p>+62 83191087290</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <form className="email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required=""/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required=""/>
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required=""/>
              </div>
              <div className="form-group mt-3">
                <textarea className="form-control" name="message" rows="7" placeholder="Message" required=""></textarea>
              </div>
              <div className="my-3">
                <div className="loading">Loading</div>
                <div className="error-message"></div>
                <div className="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div className="text-center"><button type="submit">Send Message</button></div>
            </form>
          </div>
        </div>
      </section>
    </div>   

      {/* footer  */}
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3 className='gradient-text'>Cassava Super</h3>
                <p>
                  Jl.Prof.Dr Soemantri Brodjonegoro 35141, Lampung 
                  <br/>
                  <strong>Phone : </strong>+62 83191087290 <br />
                  <strong>Email : </strong>Cassava@gmail.com
                </p>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Useful Links</h4>
              <ul>
                <li><a href="/">Dashboard</a></li>
                <li><a href="#about">About us</a></li>
                <li><a href="#stakeholder">Stakeholder</a></li>
                <li><a href="#service">Terms of service</a></li>
                <li><a href="/">Privacy policy</a></li>
              </ul>
            </div>

            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Our Services</h4>
              <ul style={{ listStyleType: 'circle'}}>
                <li><a href="/">Web Design</a></li>
                <li><a href="/">Web Development</a></li>
                <li><a href="/">Product Management</a></li>
                <li><a href="/">Marketing</a></li>
                <li><a href="/">Graphic Design</a></li>
              </ul>
            </div>

            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Our Newsletter</h4>
              <p>kirimkan saran dan kritik anda</p>
              <form action="" method="post">
                <input type="email" name="email"/>
                <input type="submit" value="Subscribe"/>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="copyright">
          &copy; Copyright <strong><span>Cassava Super</span></strong>. All Rights Reserved
        </div>
      </div>
    </footer>
  </main>   
  </>
  );
}

export default LandingPage;
