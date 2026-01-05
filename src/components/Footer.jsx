import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faYoutube,
  faLinkedinIn,
  faTwitter,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faGraduationCap,
  faBook,
  faUsers,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import './Footer.scss';

class Footer extends React.Component {
  render() {
    const { intl } = this.props;

    const quickLinks = [
      { title: 'Về chúng tôi', href: '#', icon: faUsers },
      { title: 'Đào tạo', href: '#', icon: faGraduationCap },
      { title: 'Nghiên cứu', href: '#', icon: faLightbulb },
      { title: 'Thư viện', href: '#', icon: faBook },
    ];

    return (
      <footer className="vnu-footer" role="contentinfo" aria-label="Footer">
        {/* Animated background elements */}
        <div className="vnu-footer__bg-animation">
          <div className="vnu-footer__bg-circle vnu-footer__bg-circle--1"></div>
          <div className="vnu-footer__bg-circle vnu-footer__bg-circle--2"></div>
          <div className="vnu-footer__bg-circle vnu-footer__bg-circle--3"></div>
        </div>

        <div className="vnu-footer__content">
          {/* Main Brand Section */}
          <div className="vnu-footer__column vnu-footer__column--main">
            <div className="vnu-footer__brand">
              <h3 className="vnu-footer__logo">
                <span className="vnu-footer__logo-icon">🎓</span>
                VNU-HCM
              </h3>
              {/* <div className="vnu-footer__logo-tagline">Excellence in Education</div> */}
            </div>
            <p className="vnu-footer__description">
              ĐHQG-HCM là trung tâm đào tạo đại học, sau đại học và nghiên cứu khoa học – công nghệ đa ngành, đa lĩnh vực, chất lượng cao, đạt trình độ tiên tiến, làm nòng cốt cho hệ thống giáo dục đại học và đáp ứng nhu cầu phát triển kinh tế – xã hội.
            </p>
            <div className="vnu-footer__socials">
              <a href="https://www.facebook.com/vnuhcm.info/?locale=vi_VN" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="vnu-footer__social-link vnu-footer__social-link--facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://www.youtube.com/@vnuhcm-info" aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="vnu-footer__social-link vnu-footer__social-link--youtube">
                <FontAwesomeIcon icon={faYoutube} />
              </a>
              <a href="https://www.linkedin.com/school/vietnam-national-university-hcmc/?originalSubdomain=vn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="vnu-footer__social-link vnu-footer__social-link--linkedin">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://www.instagram.com/vnuhcm" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="vnu-footer__social-link vnu-footer__social-link--instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="vnu-footer__column vnu-footer__column--links">
            <h4 className="vnu-footer__heading">Liên kết nhanh</h4>
            <ul className="vnu-footer__link-list">
              {quickLinks.map((link, index) => (
                <li key={index} className="vnu-footer__link-item">
                  <a href={link.href} className="vnu-footer__link">
                    <FontAwesomeIcon icon={link.icon} className="vnu-footer__link-icon" />
                    <span>{link.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div className="vnu-footer__column vnu-footer__column--contact">
            <h4 className="vnu-footer__heading">Liên hệ</h4>
            <div className="vnu-footer__contact-list">
              <div className="vnu-footer__contact-item">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="vnu-footer__contact-icon" />
                <div className="vnu-footer__contact-text">
                  <strong>Địa chỉ:</strong><br />
                  Đường Võ Trường Toản, Khu phố 33, Phường Linh Xuân, TP.HCM
                </div>
              </div>
              <div className="vnu-footer__contact-item">
                <FontAwesomeIcon icon={faPhone} className="vnu-footer__contact-icon" />
                <div className="vnu-footer__contact-text">
                  <strong>Điện thoại:</strong><br />
                  (84) 2837 242 181 - ext 1652
                </div>
              </div>
              <div className="vnu-footer__contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="vnu-footer__contact-icon" />
                <div className="vnu-footer__contact-text">
                  <strong>Email:</strong><br />
                  info@vnuhcm.edu.vn
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="vnu-footer__bottom">
          <div className="vnu-footer__bottom-content">
            <p className="vnu-footer__copyright">
              &copy; {new Date().getFullYear()} Đại học Quốc gia Thành phố Hồ Chí Minh. Bảo lưu mọi quyền.
            </p>
            <div className="vnu-footer__bottom-links">
              <a href="#privacy">Chính sách bảo mật</a>
              <span className="vnu-footer__separator">•</span>
              <a href="#terms">Điều khoản sử dụng</a>
              <span className="vnu-footer__separator">•</span>
              <a href="#accessibility">Khả năng truy cập</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
