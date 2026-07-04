# import QR Code library
import qrcode

qr = qrcode.QRCode()
qr.add_data("https://kunafah-store-manegment.onrender.com/")
qr.make(fit=True)

img = qr.make_image(fill_color="black", back_color="transparent")

img.save("public/IMG/kunafah_qr.png")