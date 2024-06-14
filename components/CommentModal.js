import React, { useState } from 'react';
import { Modal, View, Button } from 'react-native';
import CommentForm from './CommentForm';

const CommentModal = ({ isOpen, onClose, postId }) => {
  return (
    <Modal visible={isOpen} onRequestClose={onClose}>
      <CommentForm postId={postId} />
      <Button onPress={onClose} title="Fechar" />
    </Modal>
  );
};

export default CommentModal;
