# phoenixapi
API für verschiedene Tools, die man im Unterricht gelegentlich braucht.


## Technisches / API

Anfragen per **POST** und **GET** werden vom Server unterstützt.

Standardpfad: `api.phoenixgymnasium.de`.

### Parameter

**type**

Alle Anfragen **müssen** den Parameter _type_ enthalten. Mögliche Werte sind:
* _qr_
  
  Generiert einen QR-Code. Der Parameter _text_ muss gesetzt sein.
* _epc_

  Generiert einen Code für Online-Banking.

**text**

Nötig, um bei einem QR-Code den Inhalt zu übertragen.

**ecc**

Optionaler Parameter -> Ermöglicht, das ECC-Niveau (_L_, _M_, _Q_, _H_) anzugeben. Der Code wird größer.

### Beispiele

`{"type": "qr", "text": "https://www.pgwv.de"}`

-> Generiert einen QR-Code mit der URL _https://www.phoenixgymnasium.de_ mit der ECC-Stufe Q (Standard).
