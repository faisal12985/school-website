currentUpiLink = "new_value"; // No 'let'

function payWithUpi() {
  window.location.href = currentUpiLink; // Works only on button click
}

        function validateForm() {
            const merchantUpi = document.getElementById('merchantUpi').value;
            const amount = document.getElementById('amount').value;
            const note = document.getElementById('note').value;
            const merchantName = document.getElementById('merchantName').value;

            if (!merchantUpi || !amount || !note || !merchantName) {
                showMessage('Please fill all fields', 'error');
                return false;
            }

            if (amount <= 0) {
                showMessage('Amount must be greater than 0', 'error');
                return false;
            }

            if (!isValidUPI(merchantUpi)) {
                showMessage('Please enter a valid UPI ID', 'error');
                return false;
            }

            return true;
        }

        function isValidUPI(upi) {
            const upiPattern = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
            return upiPattern.test(upi);
        }

        function generateUPILink() {
            const merchantUpi = document.getElementById('merchantUpi').value;
            const amount = document.getElementById('amount').value;
            const note = document.getElementById('note').value;
            const merchantName = document.getElementById('merchantName').value;

            return `upi://pay?pa=${merchantUpi}&am=${amount}&tn=${encodeURIComponent(note)}&pn=${encodeURIComponent(merchantName)}`;
        }

        function payWithPhonePe() {
            if (!validateForm()) return;
            
            const upiLink = generateUPILink();
            currentUpiLink = upiLink;
            
            // Try to open PhonePe app
            window.location.href = `phonepe://pay?${upiLink.split('?')[1]}`;
            
            // Fallback to generic UPI
            setTimeout(() => {
                window.location.href = upiLink;
            }, 1000);
            
            showQRCode();
            showMessage('Opening PhonePe... If the app doesn\'t open, scan the QR code below', 'success');
        }

        function payWithGPay() {
            if (!validateForm()) return;
            
            const upiLink = generateUPILink();
            currentUpiLink = upiLink;
            
            // Try to open Google Pay
            window.location.href = `tez://upi/pay?${upiLink.split('?')[1]}`;
            
            // Fallback to generic UPI
            setTimeout(() => {
                window.location.href = upiLink;
            }, 1000);
            
            showQRCode();
            showMessage('Opening Google Pay... If the app doesn\'t open, scan the QR code below', 'success');
        }

        function payWithPaytm() {
            if (!validateForm()) return;
            
            const upiLink = generateUPILink();
            currentUpiLink = upiLink;
            
            // Try to open Paytm
            window.location.href = `paytmmp://pay?${upiLink.split('?')[1]}`;
            
            // Fallback to generic UPI
            setTimeout(() => {
                window.location.href = upiLink;
            }, 1000);
            
            showQRCode();
            showMessage('Opening Paytm... If the app doesn\'t open, scan the QR code below', 'success');
        }

        function showCustomUPI() {
            if (!validateForm()) return;
            
            const upiLink = generateUPILink();
            currentUpiLink = upiLink;
            
            showQRCode();
            showMessage('Use any UPI app to scan the QR code or copy the link', 'success');
        }

        function showQRCode() {
            const qrSection = document.getElementById('qrSection');
            const qrCode = document.getElementById('qrCode');
            const upiLinkDiv = document.getElementById('upiLink');
            
            qrSection.classList.remove('hidden');
            qrCode.innerHTML = '';
            upiLinkDiv.textContent = currentUpiLink;
            
            // Generate QR code
            QRCode.toCanvas(qrCode, currentUpiLink, {
                width: 200,
                height: 200,
                colorDark: '#000000',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.M
            }, function (error) {
                if (error) {
                    console.error('QR Code generation failed:', error);
                    qrCode.innerHTML = '<p>QR Code generation failed</p>';
                }
            });
        }

        function copyUpiLink() {
            navigator.clipboard.writeText(currentUpiLink).then(() => {
                showMessage('UPI link copied to clipboard!', 'success');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = currentUpiLink;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showMessage('UPI link copied to clipboard!', 'success');
            });
        }

        function showMessage(message, type) {
            const messageContainer = document.getElementById('messageContainer');
            const messageClass = type === 'error' ? 'error-message' : 'success-message';
            
            messageContainer.innerHTML = `<div class="${messageClass}">${message}</div>`;
            
            setTimeout(() => {
                messageContainer.innerHTML = '';
            }, 5000);
        }

        // Payment status verification (simulation)
        function verifyPayment() {
            // In a real implementation, you would verify payment status with your backend
            setTimeout(() => {
                const isPaymentSuccessful = Math.random() > 0.5; // Random simulation
                
                if (isPaymentSuccessful) {
                    showMessage('Payment successful! Thank you for your payment.', 'success');
                } else {
                    showMessage('Payment verification pending. Please check your payment app.', 'error');
                }
            }, 3000);
        }

        // Auto-verify payment when page regains focus (user returns from payment app)
        window.addEventListener('focus', function() {
            if (currentUpiLink) {
                verifyPayment();
            }
        });