# ЧОО «ГЮРЗА» — корпоративный сайт

Одностраничный сайт частной охранной организации «Гюрза» (г. Воронеж).

## Стек

- **Vite + React + TypeScript**
- **React Three Fiber + drei + three** — 3D-анимация «дышащих» сот в hero
- **Framer Motion** — появления секций, hover-эффекты, 3D-tilt визитки
- **GSAP + ScrollTrigger** — скролл-анимации (About, Advantages)

## Запуск

```bash
cd site
npm install
npm run dev      # http://localhost:5173
npm run build    # production-сборка в site/dist
```

## Структура

```
site/src/
  data/company.ts        # весь контент: телефоны, адрес, услуги (менять здесь)
  components/
    HexField3D.tsx       # 3D-поле сот (R3F, InstancedMesh)
    SnakeEmblem.tsx      # SVG-эмблема со змеёй (анимация отрисовки)
    Header.tsx           # шапка со стеклянным блюром
    Footer.tsx
  sections/
    Hero.tsx             # первый экран с 3D-фоном
    About.tsx            # о компании + эмблема
    Services.tsx         # сетка услуг
    Advantages.tsx       # цифры и преимущества
    Contacts.tsx         # контакты + интерактивная 3D-визитка
  styles/
    global.css           # дизайн-токены (цвета бренда, шрифты)
    sections.css         # стили всех секций
```

## Фирменный стиль

Палитра с фирменной продукции: тёмный фон `#0a0d12–#171c26`, золото
`#d4af37` (градиент `#9a7b1e → #f0d98c`), тёплый белый `#faf9f7`.
Шрифты: Montserrat (заголовки) + Inter (текст).
