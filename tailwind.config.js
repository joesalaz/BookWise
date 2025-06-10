// Tailwind.config.js file to customize some colors
module.exports = {
    content: [
        ".views/**/*.hbs",
        "./public/**/*.js"
    ],
    theme:{
        extend: {
            colors:{
                blue:{
                    600:'4fc3f7', // custom blue for my theme
                }
            }
        },

    },
    plugins: [],
}