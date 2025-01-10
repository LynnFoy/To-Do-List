//Code de la calculette
function appendValue(value) {
    document.getElementById("result").value += value;
  }
  
  function clearDisplay() {
    document.getElementById("result").value = '';
  }
  
  function calculateResult() {
    try {
      const result = eval(document.getElementById("result").value);
      document.getElementById("result").value = result;
    } catch (e) {
      document.getElementById("result").value = "Erreur";
    }
  }
  
  