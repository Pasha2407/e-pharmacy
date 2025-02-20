const { override, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    addWebpackModuleRule({
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
            {
                loader: 'sass-resources-loader',
                options: {
                    resources: [
                        'src/shared/styles/breakpoints.scss',
                        'src/shared/styles/colors.scss',
                        'src/shared/styles/mixins.scss',
                    ],
                },
            },
        ],
    })
);
