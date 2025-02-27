// script.js
document.getElementById('deobfuscateBtn').addEventListener('click', () => {
  const inputCode = document.getElementById('inputCode').value;
  const outputCode = document.getElementById('outputCode');
  const downloadBtn = document.getElementById('downloadBtn');

  try {
    // Attempt to parse and format the code
    const parsedCode = JSON.stringify(eval(`(${inputCode})`), null, 2);
    outputCode.value = parsedCode;
    downloadBtn.disabled = false;

    // Enable download functionality
    downloadBtn.onclick = () => {
      const blob = new Blob([parsedCode], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'deobfuscated.js';
      a.click();
      URL.revokeObjectURL(url);
    };
  } catch (error) {
    outputCode.value = 'Error: Unable to deobfuscate the code. Please check the input.';
    downloadBtn.disabled = true;
  }
});
