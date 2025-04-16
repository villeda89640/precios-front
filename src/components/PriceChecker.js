import React, { useState, useEffect } from 'react'; // <-- useEffect agregado
import {
  TextField,
  Button,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { getItemPrice } from '../api';

const PriceChecker = () => {
  const [itemCode, setItemCode] = useState('');
  const [priceData, setPriceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  // Login automático al montar el componente
  useEffect(() => {
    const loginSAP = async () => {
      try {
        const response = await fetch('http://192.168.1.162:7000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include' 
        });

        const result = await response.json();
        if (response.ok) {
          console.log('Login exitoso al cargar la página');
        } else {
          console.error(`Error en login: ${result.message}`);
        }
      } catch (error) {
        console.error('Error en login automático:', error);
      }
    };

    loginSAP();
  }, []);

  const handleSearch = async (e) => {
    e?.preventDefault();
  
    if (!itemCode.trim()) {
      setError('Por favor ingresa un código de artículo');
      return;
    }
  
    setLoading(true);
    setError(null);
    setPriceData(null);
    try {
      const data = await getItemPrice(itemCode.trim());
      setPriceData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  
    setItemCode('');
  };
  
  const handleImageClick = (imageSrc) => {
    setLargeImage(imageSrc);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setLargeImage('');
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '60px' }}>
      <Box display="flex" gap={3} flexWrap="wrap" justifyContent="center">
        {/* Verificador de precios */}
        <Card
          elevation={3}
          style={{
            flex: 1,
            backgroundColor: '#e3f2fd',
            borderRadius: '16px',
            padding: '16px',
            minWidth: '300px',
            maxWidth: '500px'
          }}
        >
          <CardContent>
  <Typography variant="h5" gutterBottom align="center">
    Verificador de Precios
  </Typography>
  <Box display="flex" flexDirection="column" gap={2}>
    <TextField
      label="Código del Artículo"
      variant="outlined"
      value={itemCode}
      onChange={(e) => setItemCode(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
      fullWidth
      disabled={loading}  // Deshabilita el input mientras carga
    />
  <Button
  variant="contained"
  color="primary"
  onClick={handleSearch}
  disabled={loading}  // Deshabilita el botón mientras carga
  fullWidth
>
  {loading ? (
  <Box display="flex" flexDirection="column" alignItems="center">
  <CircularProgress size={50} color="primary" />
  <Typography variant="body2" style={{ marginTop: '10px' }}>
    Cargando...
  </Typography>
</Box>
  ) : (
    'Buscar'
  )}
</Button>
    {error && (
      <Typography color="error" align="center">
        {error}
      </Typography>
    )}

    {priceData && (
      <Card elevation={1} style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h6" style={{ color: 'red' }}>
            Precio: ${parseFloat(priceData.price).toFixed(2)}
          </Typography>
          <Typography variant="body1">Stock: {priceData.InStock} unidades</Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
  Código: {priceData.ItemCode}
</Typography>

          <Typography variant="body1">Clave: {priceData.ForeignName}</Typography>
          <Typography variant="body1">Almacén: {priceData.WarehouseCode}</Typography>
        </CardContent>
      </Card>
    )}
  </Box>
</CardContent>
        </Card>

        {/* Imagen del producto */}
        <Card
          elevation={3}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, rgba(43, 128, 226, 0.91), rgba(22, 153, 241, 0.8))',
            borderRadius: '16px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '250px',
            maxWidth: '400px',
            transition: 'transform 0.3s ease-in-out',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <CardContent style={{ textAlign: 'center' }}>
            <Typography
              variant="h7"
              gutterBottom
              style={{ color: 'white', fontWeight: 'bold', textShadow: '1px 1px 3px rgba(0,0,0,0.6)' }}
            >
              {priceData ? priceData.ItemName : ''}
            </Typography>
            {!priceData ? (
              <img
                src="https://images.ctfassets.net/ioi9z97wax92/7GH8if1OpRAInCgRVqDCsz/735748bd1cba9dbef2d46259bd45e9c9/2025-abril01.jpg?w=1920&h=2485&q=50&fm=webp"
                alt="Imagen inicial"
                style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
                onClick={() => handleImageClick('https://images.ctfassets.net/ioi9z97wax92/7GH8if1OpRAInCgRVqDCsz/735748bd1cba9dbef2d46259bd45e9c9/2025-abril01.jpg?w=1920&h=2485&q=50&fm=webp')}
              />
            ) : (
              <Card elevation={1} style={{ marginTop: '20px' }}>
                <CardContent>
                  <img
                    src={`https://www.truper.com/media/import/imagenes/${priceData.ForeignName}.jpg`}
                    alt={`Imagen de ${priceData.ForeignName}`}
                    style={{ width: '100%', maxWidth: '300px', borderRadius: '8px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', cursor: 'pointer' }}
                    onClick={() => handleImageClick(`https://www.truper.com/media/import/imagenes/${priceData.ForeignName}.jpg`)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/imagen-no-disponible.png';
                    }}
                  />
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </Box>

      {/* Modal para mostrar la imagen grande */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="lg" fullWidth>
        <DialogContent>
          <img
            src={largeImage}
            alt="Imagen Grande"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PriceChecker;