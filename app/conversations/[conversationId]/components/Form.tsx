"use client";

import useConversation from "@/app/hooks/useConversation";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { HiPaperAirplane } from "react-icons/hi";
import { HiPhoto } from "react-icons/hi2";

const FormChat = () => {
  const { conversationId } = useConversation();
  const onFinished = (formData) => {
    axios.post("/api/messages", {
      ...formData,
      conversationId,
    });
    console.log("formData :>> ", formData);
  };
  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <HiPhoto size={30} className="text-sky-500" />
      <Form
        onFinish={onFinished}
        initialValues={{
          message: "",
        }}
      >
        <div className="flex items-center justify-center">
          <Form.Item name="message">
            <Input.TextArea placeholder="Write a message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              <HiPaperAirplane size={18} className="text-white" />
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FormChat;
