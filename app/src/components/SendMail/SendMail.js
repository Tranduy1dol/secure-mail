import React, { useState, useEffect } from "react";
import "./SendMail.css";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { keypair } from "../Login/Login";

const { generateCircuitInput } = require("../../secure/Proving/helper/generate_input")

function SendMail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const response = fetch('http://localhost:8080/get-email?limit=50')
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onSubmit = (formData) => {
    console.log(formData);
    const email_encrypted = generateCircuitInput({
      sender_pubkey: keypair.pubkey,
      receiver_address: formData.to,
      content: formData.message,
    });
    fetch('http://localhost:8080/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email_encrypted.receiver_pubkey,
        subject: formData.subject,
        message: email_encrypted.email_encrypted,
      }),
    })
        .then(response => console.log(response))
        .catch(error => console.error('Error:', error));

    dispatch(closeSendMessage());
  };
  return (
      <div className="sendMail">
        <div className="sendMail-header">
          <h3>New Message</h3>
          <CloseIcon
              onClick={() => dispatch(closeSendMessage())}
              className="sendMail-close"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
              name="to"
              placeholder="To"
              type="email"
              {...register("to", { required: true })}
          />
          {errors.to && <p className="sendMail-error">To is Required!</p>}
          <input
              name="subject"
              placeholder="Subject"
              type="text"
              {...register("subject", { required: true })}
          />
          {errors.subject && (
              <p className="sendMail-error">Subject is Required!</p>
          )}
          <input
              name="message"
              placeholder="Message"
              type="text"
              className="sendMail-message"
              {...register("message", { required: true })}
          />
          {errors.message && (
              <p className="sendMail-error">Message is Required!</p>
          )}
          <div className="sendMail-options">
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="sendMail-send"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
  );
}

export default SendMail;