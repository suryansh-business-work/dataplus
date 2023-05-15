import type { NextPage } from 'next'
import { Button } from 'primereact/button'

const UserSupport: NextPage = () => {
  return (
    <div className='component-card'>
      <div className='component-heading-with-action'>
        <div className='heading'>
          <h3>User Support</h3>
        </div>
      </div>
      <div className='component-card-body'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-4'>
              <div className='support-box'>
                <div className='support-icon'>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className='support-heading'>
                  <h4>Call Us</h4>
                </div>
                <div className='support-text'>
                  <p>Call us for quick support</p>
                </div>
                <div className='support-action'>
                  <Button>+91-8791234693</Button>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='support-box'>
                <div className='support-icon'>
                  <i className="fa-solid fa-envelope-open"></i>
                </div>
                <div className='support-heading'>
                  <h4>Email</h4>
                </div>
                <div className='support-text'>
                  <p>Email us, We will write back to you within 24 hours</p>
                </div>
                <div className='support-action'>
                  <Button>Email Us</Button>
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='support-box'>
                <div className='support-icon'>
                  <i className="fa-solid fa-comment-dots"></i>
                </div>
                <div className='support-heading'>
                  <h4>Chat Us</h4>
                </div>
                <div className='support-text'>
                  <p>Our representitive will assist you via chat</p>
                </div>
                <div className='support-action'>
                  <Button>Quick Chat</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserSupport
