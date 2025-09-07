import React, { useState } from 'react';

const CONTACTS_DB_URL =
  'https://sharpener-ecommerce-190d1-default-rtdb.asia-southeast1.firebasedatabase.app/contacts.json';

function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    // simple validation
    return /\S+@\S+\.\S+/.test(email);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        submittedAt: new Date().toISOString(),
      };

      const res = await fetch(CONTACTS_DB_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error('Failed to submit. Please try again later.');
      }

      // Reset form and show success
      setName('');
      setEmail('');
      setPhone('');
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Contact Us</h2>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">Thanks! We've received your details.</div>}

          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Id</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    required
                  />
                </div>

                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary" type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ContactPage;
