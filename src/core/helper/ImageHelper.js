import React from 'react'
import { API } from '../../backend';

 const ImageHelper = ({news}) => {
    const imageUrl = news ? `${API}/photo/${news._id}` : `https://media.istockphoto.com/vectors/error-like-laptop-with-dead-emoji-cartoon-flat-minimal-trend-modern-vector-id1011988208?k=6&m=1011988208&s=612x612&w=0&h=6l7ZtOJxcQ_xTThiNX_X0XWKRDx9rKZzgjSePb0XmtQ=`
    return (
        <div style={{maxWidth: "100px"}}>
          <img
            src={imageUrl}
            alt="news"
            style={{maxHeight:"100%", maxWidth: "100%" }}
            className="text-center"
          />
        </div>
    )
}

export default ImageHelper;
