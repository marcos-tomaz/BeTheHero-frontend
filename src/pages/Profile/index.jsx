import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import { ThemeContext } from 'styled-components'

import api from './../../services/api'

import { IncidentItem, ProfileContainer } from './style'
import { MainLink } from '../../components/SharedComponents'

export default function Profile() {
  const [incidents, setIncidents] = useState([])

  const ongName = localStorage.getItem('ongName')
  const ongId = localStorage.getItem('ongId')
  const themeContext = useContext(ThemeContext)
  const history = useHistory()

  useEffect(() => {
    api
      .get('profile', {
        headers: {
          Authorization: ongId,
        },
      })
      .then(({ data }) => setIncidents(data))
  }, [ongId])

  async function handleDeletIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      })

      setIncidents(incidents.filter((incident) => incident.id !== id))
    } catch (error) {}
  }

  function handleLogout() {
    localStorage.clear()
    history.push('/')
  }

  return (
    <ProfileContainer>
      <header>
        <img alt="Be The Hero" src={themeContext.images.LogoImage} />
        <span>Bem vindo, {ongName}</span>

        <MainLink to="/incidents/new">Cadastrar novo caso</MainLink>

        <button type="button" onClick={handleLogout}>
          <FiPower size="18" color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map((incident) => (
          <IncidentItem key={incident.id}>
            <strong>Caso:</strong>
            <p>{incident.title}</p>

            <strong>Descrição:</strong>
            <p>{incident.description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeletIncident(incident.id)}
              type="button"
            >
              <FiTrash2 size="20" color="#a8a8b3" />
            </button>
          </IncidentItem>
        ))}
      </ul>
    </ProfileContainer>
  )
}
