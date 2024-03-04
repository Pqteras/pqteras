export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.1, duration: 0.3, ease: "easeInOut" }
    }
}
  
export const titleVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { delay: 0.5, duration: 0.8, ease: "easeInOut" }
    }
}

export const contentVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: index => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.7 + index * 0.2, duration: 1, ease: "easeInOut" }
    })
}