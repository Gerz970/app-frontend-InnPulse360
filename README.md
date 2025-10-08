# 📁 Estructura de Carpetas en un Proyecto React

Este documento describe una estructura de carpetas recomendada para proyectos desarrollados con **React** (compatible con Vite, Create React App o frameworks similares).
Incluye ejemplos de archivos, propósito de cada carpeta y fragmentos de código ilustrativos.

---

## 🌱 Estructura general

```
src/
├── assets/
├── components/
├── pages/
├── hooks/
├── context/
├── services/
├── utils/
├── router/
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📂 1. assets/

Contiene recursos estáticos del proyecto: imágenes, íconos, fuentes o videos.

**Ejemplo:**

```
src/assets/
├── images/
│   ├── logo.png
│   ├── background.jpg
│   └── avatar-default.png
├── icons/
│   ├── menu.svg
│   └── close.svg
└── fonts/
    └── Poppins-Regular.ttf
```

---

## ⚙️ 2. components/

Guarda los **componentes reutilizables**, como botones, formularios o modales.
Cada componente se recomienda tener en su propia carpeta con su CSS e índice.

**Ejemplo:**

```
src/components/
├── Button/
│   ├── Button.jsx
│   ├── Button.css
│   └── index.js
├── Navbar/
│   ├── Navbar.jsx
│   └── Navbar.css
└── Modal/
    ├── Modal.jsx
    ├── Modal.css
    └── index.js
```

**Ejemplo de `Button.jsx`:**

```jsx
export const Button = ({ text, onClick }) => {
  return <button className="btn" onClick={onClick}>{text}</button>;
};
```

---

## 🏠 3. pages/

Incluye las **pantallas o vistas principales** del sitio.
Cada carpeta suele representar una ruta o sección de la aplicación.

**Ejemplo:**

```
src/pages/
├── Home/
│   ├── Home.jsx
│   ├── Home.css
│   └── index.js
├── About/
│   ├── About.jsx
│   └── About.css
└── Login/
    ├── Login.jsx
    ├── Login.css
    └── index.js
```

**Ejemplo de `Home.jsx`:**

```jsx
import { Navbar } from "../../components/Navbar/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <h1>Bienvenido a la página principal</h1>
    </>
  );
};
```

---

## 🪝 4. hooks/

Contiene **custom hooks**, funciones que reutilizan lógica de React en distintos componentes.

**Ejemplo:**

```
src/hooks/
├── useFetch.js
└── useLocalStorage.js
```

**Ejemplo de `useFetch.js`:**

```jsx
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(setData);
  }, [url]);

  return data;
};
```

---

## 🌍 5. context/

Guarda los **contextos globales** usados con React Context API, como autenticación, tema, idioma, etc.

**Ejemplo:**

```
src/context/
├── AuthContext.jsx
└── ThemeContext.jsx
```

**Ejemplo de `AuthContext.jsx`:**

```jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## 🧰 6. services/

Módulos dedicados a manejar **peticiones a APIs o servicios externos**.

**Ejemplo:**

```
src/services/
├── api.js
└── userService.js
```

**Ejemplo de `userService.js`:**

```jsx
import { api } from "./api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};
```

---

## 🧮 7. utils/

Funciones **auxiliares o de utilidad** reutilizables a lo largo del proyecto.

**Ejemplo:**

```
src/utils/
├── formatDate.js
└── validateEmail.js
```

**Ejemplo de `formatDate.js`:**

```jsx
export const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString("es-MX");
};
```

---

## 🧭 8. router/

Contiene la configuración del **enrutamiento** con React Router.

**Ejemplo:**

```
src/router/
└── AppRouter.jsx
```

**Ejemplo de `AppRouter.jsx`:**

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { About } from "../pages/About/About";
import { Login } from "../pages/Login/Login";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
```

---

## 🚀 Archivos raíz del proyecto

```
src/
├── App.jsx
├── main.jsx
└── index.css
```

**App.jsx**

```jsx
import { AppRouter } from "./router/AppRouter";

function App() {
  return <AppRouter />;
}

export default App;
```

**main.jsx**

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## 📘 Resumen

| Carpeta         | Contiene                  | Ejemplo principal |
| --------------- | ------------------------- | ----------------- |
| **assets/**     | Imágenes, íconos, fuentes | `logo.png`        |
| **components/** | Componentes reutilizables | `Button.jsx`      |
| **pages/**      | Pantallas principales     | `Home.jsx`        |
| **hooks/**      | Custom Hooks              | `useFetch.js`     |
| **context/**    | Contextos globales        | `AuthContext.jsx` |
| **services/**   | Lógica de APIs            | `userService.js`  |
| **utils/**      | Funciones auxiliares      | `formatDate.js`   |
| **router/**     | Configuración de rutas    | `AppRouter.jsx`   |

---
