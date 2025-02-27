// script.js
document.getElementById('deobfuscateBtn').addEventListener('click', () => {
  const inputCode = document.getElementById('inputCode').value.trim();
  const outputCode = document.getElementById('outputCode');
  const errorMessage = document.getElementById('errorMessage');
  const downloadBtn = document.getElementById('downloadBtn');

  // Clear previous results
  outputCode.value = '';
  errorMessage.textContent = '';
  downloadBtn.disabled = true;

  if (!inputCode) {
    errorMessage.textContent = 'Error: Input cannot be empty.';
    return;
  }

  try {
    // Safely parse the input using the Function constructor
    let parsedCode;
    try {
      parsedCode = new Function(`return ${inputCode}`)();
    } catch (parseError) {
      throw new Error('Invalid JavaScript code. Please check the input.');
    }

    // Format the parsed code
    const formattedCode = JSON.stringify(parsedCode, null, 2);
    outputCode.value = formattedCode;
    downloadBtn.disabled = false;

    // Enable download functionality
    downloadBtn.onclick = () => {
      const blob = new Blob([formattedCode], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'deobfuscated.js';
      a.click();
      URL.revokeObjectURL(url);
    };
  } catch (error) {
    errorMessage.textContent = `Error: ${error.message}`;
  }
});
