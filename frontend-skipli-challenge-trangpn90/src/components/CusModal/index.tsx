import React from 'react'
import { Modal, Button } from 'react-bootstrap';
import { IModal } from '../../utils/models';

const CusModal = ({ title = "Notifications", content, show, setShow }: IModal): React.ReactElement => {
  const handleClose = () => {
    setShow(false);
  }

  return (
    <Modal show={show} content={content} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="row row-cols-2 row-cols-md-5 g-4 my-4">
          {content && content.map((item: any) => (
            <div className="col" key={item["id"]}>
              <div className="card h-100">
                <img src={item["avatar_url"]} className="card-img-top" alt={item["login"]} />
                <div className="card-body">
                  <h5 className="card-title">{item["login"]}</h5>
                  <a href={item["html_url"]} target="_blank">Link</a>
                </div>
                <div className="card-footer text-muted">
                  <span className="fw-lighter" style={{"fontSize": "10px"}}>repos: {item["public_repos"]}</span>&nbsp;&nbsp;
                  <span className="fw-lighter" style={{"fontSize": "10px"}}>followers: {item["followers"]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CusModal