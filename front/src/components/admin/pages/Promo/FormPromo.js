import React, { useState, useEffect } from "react";
import axios from 'axios';
import ButtonConfirm from '../../common/ButtonConfirm'
import ButtonCancel from '../../common/ButtonCancel'
import Encarts from '../../common/Encarts'
import ReturnButton from '../../common/ReturnButton'
import { ChromePicker } from 'react-color'

export default function FormPromo(props) {
  const [promoModify, setPromoModify] = useState(props.donneesPromo)
// console.log('props.donneesPromo',props.donneesPromo)

  // modification de la hooks en fonction des changements du form où la donnée ne doit ps être retraitée
  const validateNewData = (e) => {
    setPromoModify({ ...promoModify, [e.target.name]: e.target.value }, console.log(promoModify))
    
  }

  // fonction pour envoyer les informations du form à jours
  let handleSubmit = e => {
    e.preventDefault();
    const promoPut = promoModify
    delete promoPut.image_name
    // console.log('promoput2', promoPut);
    axios   
      .put(`promo/${promoModify.promo_id}`, promoPut)
      .then(res => {
        if (res.err) {
          alert(res.err);
        } else {
          alert(` ${promoModify.promo_name} a été modifié avec succès!`)
          props.reload(); // au lieu de recharger complètement la page on execute la fonction reload du composant parent
        }
      }).catch(e => {
        // console.error(e);
        alert(`Erreur lors de la modification de ${promoModify.promo_name}`)
      })
    }

    useEffect(() => {
      
      }, [] )
  

  return (
    <>
      <ReturnButton onClickSee={props.onClick} />
      <Encarts title="Ajouter / Modifier les informations">

        <form className='form-group text-center '>
          <div className="form-group">
            <label htmlFor="promo_name">Désignation</label>
            <input
              name='promo_name'
              onChange={validateNewData}
              type="text"
              className="form-control text-center"
              id="designationid"
              placeholder={promoModify.promo_name}
              value={promoModify.promo_name}
            />
          </div>

          <div className="form-group">
            <label htmlFor="promo_value">Valeur</label>
            <input
              onChange={validateNewData}
              name="promo_value"
              type="text"
              step="0.01"
              className="form-control text-center"
              id="imageid"
              placeholder={promoModify.promo_value}
              value={promoModify.promo_value}
            />
          </div>

          

          <div className="form-group">
            <label htmlFor="image">Texte sticker</label>
            <input
             onChange={validateNewData}
              name="promo_sticker_text"
              type="text"
              className="form-control text-center"
              id="imageid"
              maxlength="10"
              placeholder={promoModify.promo_sticker_text}
              value={promoModify.promo_sticker_text}
            />
          </div>


          <div className="form-group">
            <label htmlFor="image">Couleur sticker</label>
            <input
             onChange={validateNewData}
              name="promo_sticker_color"
              type="text"
              className="form-control text-center"
              id="imageid"
              placeholder={promoModify.promo_sticker_color}
              value={promoModify.promo_sticker_color}
            />
            <div className="Swatch" onClick={props.onClickColorTitle}>
              <div style={{backgroundColor: `${props.titleColor}`}} className="titleCSS"/>
            </div>
            { props.stateColorPickerTitleDisplay ? <div className = "Popover" >
              <div className="Cover" onClick={promoModify.promo_sticker_color}/>
              <ChromePicker color={promoModify.promo_sticker_color} onChange={props.onChangeTitleColor} />
            </div> : null }
          </div>    

          <div className='text-left'>
            <ButtonCancel onClick={props.onClick} color='#234eb7' />
            <ButtonConfirm color='#234eb7' onClick={handleSubmit} />
          </div>
        </form>


      </Encarts>

    </>

  );
}
