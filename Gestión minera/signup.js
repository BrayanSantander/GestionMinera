if (!machineCode || !machineName || !machineDescription) {
    alert("Todos los campos son obligatorios.");
    return;
}

const sanitizeInput = (input) => {
    const temp = document.createElement('div');
    temp.textContent = input;
    return temp.innerHTML;
};
try {
    await firebase.firestore().collection('machines').add({
        code: machineCode,
        name: machineName,
        description: machineDescription,
        createdAt: new Date()
    });
    alert("Máquina registrada exitosamente.");
} catch (error) {
    console.error("Error al registrar la máquina:", error);
    alert("Ocurrió un error. Inténtalo nuevamente.");
}
