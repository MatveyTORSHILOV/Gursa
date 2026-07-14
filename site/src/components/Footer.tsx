/**
 * ===== Footer — подвал с реквизитами и сотовым паттерном =====
 */
import { COMPANY } from '../data/company'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <b className="gold-text">{COMPANY.name}</b>
          <span>{COMPANY.tagline}</span>
        </div>

        <div className="footer__contacts">
          <span>{COMPANY.address.full}</span>
          <span>
            {COMPANY.phones.map((phone, i) => (
              <a key={phone.href} href={phone.href}>
                {phone.value}
                {i < COMPANY.phones.length - 1 ? ' · ' : ''}
              </a>
            ))}
          </span>
        </div>

        <small className="footer__copy">
          © {COMPANY.foundedYear}–{new Date().getFullYear()} {COMPANY.fullName}. Все права защищены.
        </small>
      </div>
    </footer>
  )
}
