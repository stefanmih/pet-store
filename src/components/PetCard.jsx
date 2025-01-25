import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const PetCard = ({ pet }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart(); // Pristupamo funkciji za dodavanje u korpu

    const handleAddToCart = () => {
        addToCart(pet); // Dodajemo pet u globalnu korpu
    };

    return (
        <Card
            sx={{
                maxWidth: 320,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-10px)', // Pomeranje kartice pri hoveru
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)', // Veća senka na hover
                    backgroundColor: '#f5f5f5', // Svetlija pozadina pri hoveru
                },
                borderRadius: '12px', // Zaobljeni uglovi
            }}
        >
            <CardMedia
                component="img"
                height="200"
                width="200px !important"
                maxWidth="200px !important"
                image={pet.image}
                alt={pet.name}
                sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }} // Zaobljeni uglovi na slici
            />
            <CardContent>
                <Typography variant="h6">{pet.name}</Typography>
                <Typography variant="body2" color="textSecondary">{pet.type}</Typography>
                <Typography variant="body1">Cena: {pet.price} RSD</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#1976d2', // Promena boje dugmeta pri hoveru
                            },
                            margin: 1
                        }}
                        onClick={() => navigate(`/pets/${pet.id}`)} // Navigacija na stranicu detalja ljubimca
                    >
                        Detalji
                    </Button>
                    <Button
                        sx={{
                            transition: 'background-color 0.3s ease',
                            '&:hover': {
                                backgroundColor: '#1976d2', // Promena boje dugmeta pri hoveru
                            },
                            margin: 1
                        }}
                        variant="contained"
                        color="primary"
                        onClick={handleAddToCart}>
                        Dodaj u korpu
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PetCard;
