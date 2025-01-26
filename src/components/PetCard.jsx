import React from 'react';
import { Card, CardContent, Typography, Button, CardMedia, Box, Chip } from '@mui/material';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router';
import { useNotification } from './NotificationProvider';

const PetCard = ({ pet }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const { showInfo } = useNotification();

    // Prosečna ocena iz recenzija
    const averageRating =
        pet.reviews && pet.reviews.length > 0
            ? pet.reviews.reduce((total, review) => total + review.rating, 0) / pet.reviews.length
            : null;

    const handleAddToCart = () => {
        const uniquePet = {
            ...pet,
            uniqueId: `${pet.id}-${Date.now()}-${Math.random()}`,
        };
        addToCart(uniquePet);
        showInfo("Dodato u korpu", "success");
    };

    return (
        <Card
            sx={{
                maxWidth: 320,
                position: 'relative', // Dodajemo relativni položaj da bismo koristili apsolutni položaj za ocenu
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                    backgroundColor: '#f5f5f5',
                },
                borderRadius: '12px',
            }}
        >
            {/* Ocena u gornjem desnom uglu */}
            {averageRating !== null && (
                <Chip
                    label={`⭐ ${averageRating.toFixed(1)}`}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        backgroundColor: '#ffc107',
                        color: '#fff',
                        fontWeight: 'bold',
                    }}
                />
            )}

            <CardMedia
                component="img"
                height="200"
                image={pet.image}
                alt={pet.name}
                sx={{ borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
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
                        sx={{ marginTop: 2, marginRight: 5 }}
                        onClick={() => navigate(`/pets/${pet.id}`)}
                    >
                        Detalji
                    </Button>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginTop: 2 }}
                        onClick={handleAddToCart}
                    >
                        Dodaj u korpu
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default PetCard;
