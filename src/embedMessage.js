const embedMessage = (color, title, description, footer) => {
    return {
        color: color,
        title: title,
        description: description,
        footer: {
            text: footer,
        },
    };
};

module.exports = { embedMessage };