import React, { useState } from 'react'; // <-- ¡CORREGIDO!
import { useNavigate } from 'react-router-dom'; 
import "./ListaHoteles.css";

const mockHoteles = [
    { 
        id: 1, 
        nombre: "Hotel Plaza Madrid", 
        direccion: "Calle Gran Vía, 123", 
        id_pais: 1, 
        id_estado: 15,
        email_contacto: "reservas@hotelplaza.com",
        numero_estrellas: 4,
        telefono: "+34 91 123 45 67",
        foto_url: "https://via.placeholder.com/400x250/6A5ACD/FFFFFF?text=Hotel+Madrid+Plaza" 
    },
    { 
        id: 2, 
        nombre: "InnPulse Suites Barcelona", 
        direccion: "Passeig de Gràcia, 45", 
        id_pais: 1, 
        id_estado: 8,
        email_contacto: "contact@innpulsesuites.com",
        numero_estrellas: 5,
        telefono: "+34 93 987 65 43",
        foto_url: "https://via.placeholder.com/400x250/4CAF50/FFFFFF?text=InnPulse+Barcelona" 
    },
    { 
        id: 3, 
        nombre: "Casa Rural La Montaña", 
        direccion: "Camino del Bosque, 10", 
        id_pais: 1, 
        id_estado: 3,
        email_contacto: "info@casaruralmontana.com",
        numero_estrellas: 3,
        telefono: "+34 921 55 44 33",
        foto_url: "https://via.placeholder.com/400x250/FF9800/FFFFFF?text=Casa+Rural" 
    },
    { 
        id: 4, 
        nombre: "Beach Resort Costa del Sol", 
        direccion: "Av. del Mar, 7", 
        id_pais: 1, 
        id_estado: 29,
        email_contacto: "reservas@beachresort.com",
        numero_estrellas: 4,
        telefono: "+34 952 11 22 33",
        foto_url: "https://via.placeholder.com/400x250/2196F3/FFFFFF?text=Beach+Resort" 
    },
];

export default function ListaHoteles() {
    // 1. Inicializa el estado con los datos de prueba directamente
    const [hoteles, setHoteles] = useState(mockHoteles); 
    const [busqueda, setBusqueda] = useState('');
    
 
    const navigate = useNavigate(); 

    // 3. Eliminamos el useEffect que cargaba servicios

    const hotelesFiltrados = hoteles.filter(hotel =>
        hotel.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        hotel.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
        hotel.email_contacto.toLowerCase().includes(busqueda.toLowerCase())
    );

    const handleModificar = (hotelId) => {
        console.log("Simulación: Navegar a /hoteles/editar/" + hotelId);
        navigate(`/hoteles/editar/${hotelId}`); 
    };

    const handleEliminar = (hotelId) => {
        if (window.confirm(`[SIMULACIÓN] ¿Estás seguro de que quieres eliminar el hotel con ID ${hotelId}?`)) {
            // Elimina el elemento del estado local para simular la acción
            setHoteles(hoteles.filter(hotel => hotel.id !== hotelId));
            console.log(`Simulación: Hotel ID ${hotelId} eliminado localmente.`);
        }
    };

    const handleCrearHotel = () => {
        console.log("Simulación: Navegar a /hoteles/crear");
        navigate('/hoteles/crear'); 
    };
    
    return (
        <div className="lista-hoteles-container">
            <h1>Administración de Hoteles</h1>

            <div className="acciones-header">
                <button 
                    className="btn-primary" 
                    onClick={handleCrearHotel}
                >
                    <i className="fas fa-plus"></i> Crear Hotel
                </button>

                <div className="search-bar">
                    <i className="fas fa-search"></i>
                    <input
                        type="text"
                        placeholder="Buscar por nombre, dirección, email..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </div>

            <div className="hoteles-grid">
                {hotelesFiltrados.length > 0 ? (
                    hotelesFiltrados.map((hotel) => (
                        <div className="hotel-card" key={hotel.id}>
                            <div className="hotel-card-image">
                                <img src={hotel.foto_url || "https://via.placeholder.com/400x250/E0E0E0/6C757D?text=No+Photo"} alt={`Foto de ${hotel.nombre}`} />
                            </div>
                            <div className="hotel-card-content">
                                <h2>{hotel.nombre}</h2>
                                <p><i className="fas fa-map-marker-alt"></i> {hotel.direccion}</p>
                                <p><i className="fas fa-envelope"></i> {hotel.email_contacto}</p>
                                <p><i className="fas fa-phone"></i> {hotel.telefono}</p>
                                <p className="estrellas">
                                    {/* Muestra estrellas llenas */}
                                    {Array.from({ length: hotel.numero_estrellas }, (_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                    {/* Muestra estrellas vacías hasta completar 5 */}
                                    {Array.from({ length: 5 - (hotel.numero_estrellas || 0) }, (_, i) => (
                                        <i key={`empty-${i}`} className="far fa-star"></i>
                                    ))}
                                </p>
                            </div>
                            <div className="hotel-card-actions">
                                <button 
                                    className="btn-accion btn-modificar" 
                                    title="Modificar"
                                    onClick={() => handleModificar(hotel.id)}
                                >
                                    <i className="fas fa-edit"></i> Modificar
                                </button>
                                <button 
                                    className="btn-accion btn-eliminar" 
                                    title="Eliminar"
                                    onClick={() => handleEliminar(hotel.id)}
                                >
                                    <i className="fas fa-trash-alt"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">
                        {busqueda ? "No se encontraron hoteles que coincidan con la búsqueda." : "No hay hoteles de prueba registrados en el sistema."}
                    </p>
                )}
            </div>
        </div>
    );
}