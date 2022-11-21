module.exports = {
  presets: [require.resolve("next/babel")],
  plugins: [
    [
      require.resolve("babel-plugin-import"),
      {
        libraryName: "antd",
        style: true,
      },
    ],
  ],
};
