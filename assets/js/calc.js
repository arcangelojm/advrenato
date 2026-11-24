/* Calculadoras (estimativas). Carregado só nas páginas de ferramenta.
   Fatores de conversão do art. 70 do Decreto 3.048/1999 (conversão permitida só para tempo até 13/11/2019).
   [CONFIRMAR com o advogado antes de publicar.] */
(function () {
  var FATOR = { M: { 15: 2.33, 20: 1.75, 25: 1.40 }, F: { 15: 2.00, 20: 1.50, 25: 1.20 } };
  function num(v) { v = parseFloat(String(v).replace(',', '.')); return isNaN(v) || v < 0 ? 0 : v; }
  function anosMeses(totalMeses) {
    totalMeses = Math.max(0, Math.round(totalMeses));
    var a = Math.floor(totalMeses / 12), m = totalMeses % 12;
    return a + (a === 1 ? ' ano' : ' anos') + (m ? ' e ' + m + (m === 1 ? ' mês' : ' meses') : '');
  }
  function out(form, html) { var o = form.querySelector('.tool__out'); if (o) { o.hidden = false; o.innerHTML = html; o.focus(); } }

  var calc = document.getElementById('calc-form');
  if (calc) calc.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!calc.reportValidity()) return;
    var exige = parseInt(calc.grau.value, 10), sexo = calc.sexo.value;
    var antes = num(calc.antes_anos.value) * 12 + num(calc.antes_meses.value);
    var depois = num(calc.depois_anos.value) * 12 + num(calc.depois_meses.value);
    var total = antes + depois, falta = exige * 12 - total;
    var conv = antes * FATOR[sexo][exige];
    var msg = '<p><strong>Tempo especial informado:</strong> ' + anosMeses(total) + ' (exigido: ' + exige + ' anos).</p>';
    msg += falta > 0 ? '<p>Faltariam cerca de <strong>' + anosMeses(falta) + '</strong> de atividade especial para completar o tempo exigido.</p>'
                     : '<p>Pelo tempo informado, o tempo especial exigido <strong>já estaria completo</strong>. O direito depende da prova da exposição no PPP e das demais regras.</p>';
    if (antes > 0) msg += '<p>Se for usado em uma aposentadoria comum, o tempo especial até 13/11/2019 convertido daria cerca de <strong>' + anosMeses(conv) + '</strong> (fator ' + FATOR[sexo][exige].toFixed(2).replace('.', ',') + ').</p>';
    msg += '<p class="form__note">Estimativa informativa. O resultado real depende do seu PPP, do CNIS e da análise do advogado.</p>';
    out(calc, msg);
  });

  var conv = document.getElementById('conv-form');
  if (conv) conv.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!conv.reportValidity()) return;
    var g = parseInt(conv.grau.value, 10), s = conv.sexo.value, f = FATOR[s][g];
    var meses = num(conv.anos.value) * 12 + num(conv.meses.value), r = meses * f;
    out(conv, '<p><strong>' + anosMeses(meses) + '</strong> de tempo especial (atividade de ' + g + ' anos) × fator <strong>' + f.toFixed(2).replace('.', ',') +
      '</strong> = cerca de <strong>' + anosMeses(r) + '</strong> de tempo comum, um acréscimo de ' + anosMeses(r - meses) + '.</p>' +
      '<p class="form__note">Vale só para períodos trabalhados até 13/11/2019. Depois da Reforma da Previdência a conversão é proibida. Estimativa informativa.</p>');
  });
})();
