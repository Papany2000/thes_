import React from 'react';
import { CardActions, IconButton, Popover } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Delete, Share } from '@mui/icons-material';
import { TelegramIcon, VKIcon, WhatsappIcon } from 'react-share';
import { styled } from '@mui/material/styles';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const CardActionsComponent = ({
    expanded,
    handleExpandClick,
    handleDelete,
    handleShareClick,
    handleShareClose,
    shareAnchorEl,
    recipe
}) => {
    const openShare = Boolean(shareAnchorEl);

    const shareOnWhatsApp = () => {
        const text = `Проверьте этот рецепт: ${recipe.title}\n\n${recipe.recipeurl}`;
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/?text=${encodedText}`;
        window.open(whatsappUrl, '_blank');
    };

    const shareOnTelegram = () => {
        const recipeUrl = recipe.recipeurl || window.location.href;
        const text = `Проверьте этот рецепт: ${recipe.title}`;
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(recipeUrl);
        const telegramUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    };

    const shareOnVK = () => {
        const text = `Проверьте этот рецепт: ${recipe.title}\n\n${recipe.recipeurl}`;
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(window.location.href);
        const vkUrl = `https://vk.com/share.php?url=${encodedUrl}&title=${encodedText}&description=${encodeURIComponent(recipe.recipes)}`;
        window.open(vkUrl, '_blank', 'noopener,noreferrer');
    };

    return (
        <CardActions disableSpacing sx={{ background: '#f5f5f3'}}>
            <IconButton aria-label="поделиться" onClick={handleShareClick}>
                <Share />
            </IconButton>
            <Popover
                open={openShare}
                anchorEl={shareAnchorEl}
                onClose={handleShareClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ padding: '8px', display: 'flex', gap: '8px' }}>
                    <TelegramIcon size={32} round={true} onClick={shareOnTelegram} />
                    <WhatsappIcon size={32} round={true} onClick={shareOnWhatsApp} />
                    <VKIcon size={32} round={true} onClick={shareOnVK} />
                </div>
            </Popover>
            <IconButton aria-label="удалить" onClick={handleDelete}>
                <Delete />
            </IconButton>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="показать больше"
            >
                <ExpandMoreIcon />
            </ExpandMore>
        </CardActions>
    );
};

export default CardActionsComponent;