import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Collapse, Link } from '@mui/material';

import CardActionsComponent from './cardActions';


const InteractiveCard = ({ onDelete, ...recipe }) => {
    const [expanded, setExpanded] = useState(false);
    const [shareAnchorEl, setShareAnchorEl] = useState(null);

    const handleExpandClick = () => setExpanded(!expanded);

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
    };

    const handleShareClick = (event) => {
        setShareAnchorEl(event.currentTarget);
    };

    const handleShareClose = () => {
        setShareAnchorEl(null);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent sx={{ height: 75, textAlign: 'center', margin: '0.5rem 0.5rem' }}>
                <Typography variant="h5" component="div">
                    {recipe.title}
                </Typography>
            </CardContent>
                <CardMedia
                    component="img"
                    height="194"
                    image={recipe.photourl}
                    alt={recipe.title}
                />
            <CardActionsComponent
                expanded={expanded}
                handleExpandClick={handleExpandClick}
                handleDelete={handleDelete}
                handleShareClick={handleShareClick}
                handleShareClose={handleShareClose}
                shareAnchorEl={shareAnchorEl}
                recipe={recipe} 
            />
            <Collapse sx={{ background: '#f5f5f3'}} in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Рецепт:</Typography>
                    <Typography paragraph>
                        {recipe.recipes}
                        <Link href={recipe.recipeurl} target="_blank" rel="noopener noreferrer">
                            Более подробно 
                        </Link>
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default InteractiveCard;