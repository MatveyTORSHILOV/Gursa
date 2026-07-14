/**
 * ===== App — сборка страницы ЧОО «ГЮРЗА» =====
 * Одностраничный лендинг (правило 80/20: одна страница закрывает
 * 80% задач сайта охранной организации).
 *
 * Структура — паттерн Trust & Authority (рекомендация ui-ux-pro-max):
 *   Hero (доверие) → About (кто мы) → Services (что делаем)
 *   → Advantages (почему мы) → Contacts (CTA) → Footer
 */
import Header from './components/Header'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Advantages from './sections/Advantages'
import Contacts from './sections/Contacts'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Advantages />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
