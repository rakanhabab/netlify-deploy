import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Welcome to TechBay!</h2>
      <div className="row">
        <div className="col-md-6">
          <p>
            At TechBay, our mission is to become the leading supplier of cutting-edge technology devices in Saudi Arabia. We strive to offer a wide range of products to meet the diverse needs of our customers. Whether you're a tech enthusiast or a business looking for reliable technology solutions, TechBay has you covered.
          </p>
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={() => navigate('/products')}
            >
              Explore Products
            </button>
          </div>
          <p className="mt-4">
            Explore our vast selection of the latest gadgets and electronics. From smartphones and tablets to laptops and accessories, our product lineup is sure to excite and satisfy your technological cravings.
          </p>
        </div>
        <div className="col-md-6" style={{
                maxHeight: '235px', maxWidth: '500px', overflow: 'hidden'
          }}>
          
          <img
            src="https://cdn.vectorstock.com/i/1000v/15/88/technology-and-multimedia-digital-devices-icons-vector-20251588.jpg"
            alt="Tech Products"
            className="img-fluid mb-4"
            style={{ width: '500px' }}
          />

        </div>          
        <div style={{ padding: '10px', lineHeight: '1.6' }}>
          <p>
            <strong>Why Choose TechBay?</strong>
          </p>
          <ul style={{ paddingLeft: '20px', listStylePosition: 'inside' }}>
            <li>Wide variety of high-quality products</li>
            <li>Competitive pricing</li>
            <li>Expert customer support</li>
            <li>Trusted by thousands of customers</li>
          </ul>
        </div>

      </div>
      <div className="row">
  <div className="col-12" style={{ paddingTop: '30px' }}>
    <img
      src="https://poonawallafincorp.com/pfca/assets/blog_banner/blog_banner-banner-image-what-is-a-gadget-loan.jpg"
      alt="Tech Showcase"
      className="img-fluid mb-4"
      style={{ borderRadius: '10px' }}
    />
  </div>
</div>

    </div>
  );
}