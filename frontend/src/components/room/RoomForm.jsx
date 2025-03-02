// src/components/room/RoomForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { createRoom } from '../../../services/rooms';

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Room name is required')
    .min(3, 'Room name must be at least 3 characters'),
  isPrivate: Yup.boolean()
});

const RoomForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  return (
    <div className="room-form">
      <h2>Create New Room</h2>
      {error && <div className="error-message">{error}</div>}
      
      <Formik
        initialValues={{ name: '', isPrivate: false }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const room = await createRoom({
              name: values.name,
              is_private: values.isPrivate
            });
            navigate(`/rooms/${room.id}`);
          } catch (err) {
            setError('Failed to create room');
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Room Name</label>
              <Field type="text" name="name" className="form-control" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            
            <div className="form-group checkbox">
              <label>
                <Field type="checkbox" name="isPrivate" />
                Make this room private
              </label>
            </div>
            
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Room'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RoomForm;