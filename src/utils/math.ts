const Now = (inSeconds = false) => {
    if (inSeconds) {
      return Math.floor(new Date().getTime() / 1000);
    }
    return new Date().getTime()
}

export default { Now }