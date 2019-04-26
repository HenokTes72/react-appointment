// get all appointment users
const mockAllAppointment = () => {
  const fakeData = {
    success: true,
    '0': {
      group: [
        { nombre: 'Hospital San Fernando', color: '#1df5b6' },
        { nombre: 'Centro M\u00e9dico Nacional', color: '#b844f5' },
        { nombre: 'Dental Group', color: '#f5c642' },
        { nombre: 'Centro Especializado San Fernando', color: '#c3ddcb' },
        { nombre: 'Centro M\u00e9dico Brandao', color: '#291edb' },
        { nombre: 'Consultorios M\u00e9dicos Royal Center', color: '#1eb9a1' },
        { nombre: 'Pac\u00edfica Salud', color: '#d4875e' },
        { nombre: 'Centro M\u00e9dico San Judas Tadeo', color: '#34b7d9' },
        { nombre: 'Cl\u00ednica Santa Fe Col\u00f3n 2000', color: '#f4c7de' },
        { nombre: 'Consultorios Grimaldo Sucre', color: '#2f14b9' },
        { nombre: 'Hospital Regional de Chepo', color: '#fdf41b' },
        { nombre: 'Centro M\u00e9dico Garibaldo', color: '#2722e0' },
        { nombre: 'Street Mall', color: '#f9b57d' },
        { nombre: 'Cl\u00ednica Physis', color: '#090930' },
        { nombre: 'SaludVitale Tests', color: '#917b98' },
        { nombre: 'SaludVitale Tests', color: '#1c0a98' },
        { nombre: 'Centro Dermo', color: '#c1dd33' },
        { nombre: 'Dermatol\u00f3gica Clinic and MediSpa', color: '#73d045' },
        { nombre: 'MyClinic Panam\u00e1', color: '#5f970c' },
        { nombre: 'Institucion_prueba', color: '#0682e6' }
      ],
      clinica: [
        { slot_date: '2019-04-12', doctor_id: 295, id: 150971, clinica_id: 187 }
      ],
      dispoOriginal: [
        {
          slot_date: '2019-04-12',
          user_id: 482,
          id: 150971,
          clinica_id: 187,
          doctor_id: 295,
          nombre: 'Institucion_prueba',
          cantClinicas: 0,
          color: '#1df5b6'
        }
      ],
      cjColor: [
        { color: '#1df5b6', nombre: 'Institucion_prueba', cantClinicas: 0 }
      ],
      disponibilidad: [
        {
          slot_date: '2019-04-12',
          user_id: 482,
          id: 150971,
          clinica_id: 187,
          doctor_id: 295,
          nombre: 'Institucion_prueba',
          cantClinicas: 0,
          color: '#1df5b6'
        }
      ],
      horarios: [
        {
          slot_date: '2018-06-15',
          inicio: '2:40 am',
          fin: '2:50 am',
          user_id: 342,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2018-07-09',
          inicio: '4:41 pm',
          fin: '4:51 pm',
          user_id: 295,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2018-08-22',
          inicio: '8:30 am',
          fin: '8:50 am',
          user_id: 482,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2018-10-09',
          inicio: '1:00 am',
          fin: '1:10 am',
          user_id: 482,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2018-10-16',
          inicio: '1:00 am',
          fin: '1:10 am',
          user_id: 342,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2018-10-20',
          inicio: '1:00 am',
          fin: '1:10 am',
          user_id: 482,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2018-12-20',
          inicio: '7:00 am',
          fin: '7:15 am',
          user_id: 295,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2018-12-24',
          inicio: '7:00 am',
          fin: '7:15 am',
          user_id: 295,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2018-12-25',
          inicio: '7:00 am',
          fin: '7:15 am',
          user_id: 295,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2018-12-28',
          inicio: '7:30 am',
          fin: '7:45 am',
          user_id: 295,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2018-12-30',
          inicio: '9:00 am',
          fin: '9:15 am',
          user_id: 295,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2018-12-31',
          inicio: '8:00 am',
          fin: '8:15 am',
          user_id: 295,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-01-18',
          inicio: '6:00 am',
          fin: '6:10 am',
          user_id: 770,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2019-01-24',
          inicio: '7:09 pm',
          fin: '7:24 pm',
          user_id: 792,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-02-14',
          inicio: '4:14 pm',
          fin: '4:44 pm',
          user_id: 805,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-03-06',
          inicio: '10:30 pm',
          fin: '10:40 pm',
          user_id: 805,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2019-03-12',
          inicio: '2:00 pm',
          fin: '3:00 pm',
          user_id: 731,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-03-28',
          inicio: '11:00 am',
          fin: '11:20 am',
          user_id: 342,
          sucursales_instituciones: 'SaludVitale Tests',
          clinicaId: 160
        },
        {
          slot_date: '2019-03-29',
          inicio: '11:00 am',
          fin: '11:20 am',
          user_id: 342,
          sucursales_instituciones: 'SaludVitale Tests',
          clinicaId: 160
        },
        {
          slot_date: '2019-04-04',
          inicio: '9:49 am',
          fin: '10:49 am',
          user_id: 482,
          sucursales_instituciones: 'SaludVitale Tests',
          clinicaId: 160
        },
        {
          slot_date: '2019-04-05',
          inicio: '12:35 pm',
          fin: '12:50 pm',
          user_id: 841,
          sucursales_instituciones: 'SaludVitale Tests',
          clinicaId: 160
        },
        {
          slot_date: '2019-04-12',
          inicio: '7:00 am',
          fin: '7:10 am',
          user_id: 482,
          sucursales_instituciones: 'SaludVitale Tests',
          clinicaId: 163
        },
        {
          slot_date: '2019-05-06',
          inicio: '9:40 am',
          fin: '10:10 am',
          user_id: 295,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-05-15',
          inicio: '1:00 pm',
          fin: '1:30 pm',
          user_id: 295,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2019-06-19',
          inicio: '11:00 am',
          fin: '11:30 am',
          user_id: 342,
          sucursales_instituciones: 'Hospital Regional de Chepo',
          clinicaId: 108
        },
        {
          slot_date: '2019-09-05',
          inicio: '11:00 am',
          fin: '11:30 am',
          user_id: 342,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-11-06',
          inicio: '11:30 am',
          fin: '11:45 am',
          user_id: 342,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-12-10',
          inicio: '11:30 am',
          fin: '12:00 pm',
          user_id: 409,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-12-12',
          inicio: '1:30 pm',
          fin: '2:00 pm',
          user_id: 409,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-12-18',
          inicio: '1:00 pm',
          fin: '1:30 pm',
          user_id: 342,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-12-25',
          inicio: '1:30 pm',
          fin: '1:45 pm',
          user_id: 409,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2019-12-31',
          inicio: '1:30 pm',
          fin: '1:40 pm',
          user_id: 409,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2020-01-01',
          inicio: '1:00 pm',
          fin: '1:10 pm',
          user_id: 409,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2020-04-10',
          inicio: '11:30 am',
          fin: '11:45 am',
          user_id: 409,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        },
        {
          slot_date: '2020-04-24',
          inicio: '11:30 am',
          fin: '11:45 am',
          user_id: 342,
          sucursales_instituciones: 'Consultorios Grimaldo Sucre',
          clinicaId: 104
        }
      ]
    }
  };

  return { data: fakeData, success: true };
};

// get appointment by date
const mockAppointmentByDate = () => {
  const fakeData = {
    success: true,
    profesionales: {
      id: 295,
      email: 'pix.appmovil@gmail.com',
      profile_pic: '1915300668.png',
      first_name: 'Profesionales',
      last_name: 'Prueba',
      device_token: '',
      device_type: 0,
      facebook_id: null,
      online_status: 0,
      s1: 1,
      s2: 1,
      s3: 1,
      s4: 1,
      s5: 1,
      created_at: '2018-02-21 18:02:01',
      updated_at: '2019-04-11 07:04:04',
      confirm_token:
        // eslint-disable-next-line max-len
        '9921zPo0rDceFIsXJJIeFzrzXvN1JZ8l99Dwc6RKm8lhAJ5ErLBQ4JeYx4Et0608gJ8CndeDXZzH6AvU3iliEaGckklrQfxdRSEOr5pDUdIGgyDERktOmXC8xsRtLlpgCVG7JpTOtG80BQ7x3KHdhusTBgnsPhzWDbO5rvpJ8ZNLQmCLN4nHJXttIruIWHrmIwmKixDq1yHxb2FH22gBwX3AUojEX3q2TCAITqImRrEO7GEkS4EwEW9VyBA9JGm',
      status: 1,
      telefono: 123456
    },
    horarios: [
      {
        id: 150971,
        slot_date: '2019-04-12',
        inicio: '7:01 am',
        fin: '8:11 am',
        slot_status: 1,
        user_id: 482,
        doctor_id: 295,
        idRe: 150971,
        clinica: 'Institucion_prueba',
        clinicaId: 187
      }
    ]
  };
  return { data: fakeData, success: true };
};

const mockBasicInfo = () => {
  const fakeData = {
    page_title: 'Citas',
    aTime: [
      '01:00 AM',
      '01:30 AM',
      '02:00 AM',
      '02:30 AM',
      '03:00 AM',
      '03:30 AM',
      '04:00 AM',
      '04:30 AM',
      '05:00 AM',
      '05:30 AM',
      '06:00 AM',
      '06:30 AM',
      '07:00 AM',
      '07:30 AM',
      '08:00 AM',
      '08:30 AM',
      '09:00 AM',
      '09:30 AM',
      '10:00 AM',
      '10:30 AM',
      '11:00 AM',
      '11:30 AM',
      '12:00 PM',
      '12:30 PM',
      '01:00 PM',
      '01:30 PM',
      '02:00 PM',
      '02:30 PM',
      '03:00 PM',
      '03:30 PM',
      '04:00 PM',
      '04:30 PM',
      '05:00 PM',
      '05:30 PM',
      '06:00 PM',
      '06:30 PM',
      '07:00 PM',
      '07:30 PM',
      '08:00 PM',
      '08:30 PM',
      '09:00 PM',
      '09:30 PM',
      '10:00 PM',
      '10:30 PM',
      '11:00 PM',
      '11:30 PM',
      '12:00 AM'
    ],
    aMinutes: [
      '10 minutos',
      '15 minutos',
      '20 minutos',
      '30 minutos',
      '1 hora',
      '2 horas',
      '3 horas',
      '4 horas',
      '5 horas',
      '6 horas',
      '7 horas',
      '8 horas',
      '9 horas',
      '10 horas',
      'Todo el dia'
    ],
    eMinutes: [
      '10 minutos',
      '15 minutos',
      '20 minutos',
      '30 minutos',
      'Ninguno'
    ],
    idUser: '295 835',
    clinicas: [
      {
        id: 163,
        user_id: 663,
        nombre: 'SaludVitale Tests',
        descripcion: '',
        telefono: 0,
        direccion: 'Panam\u00e1',
        provincia_id: 14,
        ciudad_id: 18,
        latitud: '8.958018299999999',
        longitud: '-79.54247470000001',
        institucion_id: 11,
        peticionario_id: null,
        status: 1
      },
      {
        id: 187,
        user_id: 882,
        nombre: 'Institucion_prueba',
        descripcion: '',
        telefono: 0,
        direccion: 'nueva segovia',
        provincia_id: 14,
        ciudad_id: 14,
        latitud: '8.990802398696514',
        longitud: '-79.51872670898439',
        institucion_id: 11,
        peticionario_id: null,
        status: 1
      }
    ],
    doctores: [
      {
        pid: 188,
        user_id: 295,
        first_name: 'Profesionales',
        last_name: 'Prueba',
        email: 'pix.appmovil@gmail.com',
        profile_pic: '1915300668.png',
        speciality_name: 'Otras Especialidades',
        about:
          // eslint-disable-next-line max-len
          'No soy un profesional real, soy solo un profesional de prueba de SaludVitale. En este campo puedes hablar de tu experiencia y conocimientos como profesional de la salud, especializaci\u00f3n, tratamientos que aplicas. Puedes incluso hablar un poco de ti, razones por las que decidiste dedicarte a esta especialidad de la medicina o salud.123',
        languages: 'Ingl\u00e9s, Espa\u00f1ol, Franc\u00e9s',
        graduate_year: 2018,
        collegiate_number: '123456',
        telephone: '3534455',
        cellphone: '65444155',
        website: 'www.google.com',
        address: null,
        state_name: 'Panam\u00e1',
        bussiness_hours: null,
        city_name: 'Ciudad de Panam\u00e1',
        monday_start: null,
        monday_end: null,
        tuesday_start: null,
        tuesday_end: null,
        wednesday_start: null,
        wednesday_end: null,
        thursday_start: null,
        thursday_end: null,
        friday_start: null,
        friday_end: null,
        saturday_start: null,
        saturday_end: null,
        sunday_start: null,
        sunday_end: null,
        avg_ratings: '0.00',
        total_ratings: 0,
        total_paid: '0.00',
        reservation_fee: '10.00',
        immediate_fee: '15.00',
        facetoface_fee: '50.00',
        consulta_fee: '75.00',
        cedula: '123456',
        idoneidad: 654321,
        banco: 'Credicorp',
        tipo_cuenta: 'corriente',
        titular: 'Jose',
        cuenta: 1234567,
        floor_office: '12',
        videocheck: 1,
        facetofacecheck: 1,
        FreeStatus: 0,
        puntaje: '5'
      },
      {
        pid: 456,
        user_id: 835,
        first_name: 'PROFESIONAL 2',
        last_name: 'PRUEBA',
        email: 'ferrarielimortal@hotmail.com',
        profile_pic: null,
        speciality_name: 'Otras Especialidades',
        about: 'USUARIO DE PRUEBAS 2',
        languages: 'Ingl\u00e9s,Espa\u00f1ol',
        graduate_year: 2019,
        collegiate_number: 'prueba',
        telephone: '123456',
        cellphone: '123456',
        website: 'www.google.com',
        address: null,
        state_name: 'Panam\u00e1',
        bussiness_hours: null,
        city_name: 'Ciudad de Panam\u00e1',
        monday_start: null,
        monday_end: null,
        tuesday_start: null,
        tuesday_end: null,
        wednesday_start: null,
        wednesday_end: null,
        thursday_start: null,
        thursday_end: null,
        friday_start: null,
        friday_end: null,
        saturday_start: null,
        saturday_end: null,
        sunday_start: null,
        sunday_end: null,
        avg_ratings: '0.00',
        total_ratings: 0,
        total_paid: '0.00',
        reservation_fee: '0.00',
        immediate_fee: '0.00',
        facetoface_fee: '0.00',
        consulta_fee: '0.00',
        cedula: '123456',
        idoneidad: 123456,
        banco: '',
        tipo_cuenta: 'ahorro',
        titular: '',
        cuenta: 0,
        floor_office: null,
        videocheck: 0,
        facetofacecheck: 0,
        FreeStatus: 0,
        puntaje: null
      }
    ]
  };
  return { data: fakeData, success: true };
};

const mockEmailInfo = () => {
  const html = `
  <html style="background-color: white; transition: background-color 0.15s ease 0s;"
  class="gr__test1_saludvitale_com ss-shaded-scrollbars">
  
  <head></head>
  
  <body data-gr-c-s-loaded="true">
  <ul class="dropdown-menu" style="display:block; position:relative">
      <li><a href="#">alfonsog.p@hotmail.com</a></li>
      <li><a href="#">anaflorez@ulatina.edu.pa</a></li>
      <li><a href="#">ankit2435@rediffmail.com</a></li>
      <li><a href="#">asaldana@cmfamiliar.com</a></li>
      <li><a href="#">brunoflorez@clinicadermoestetica.com</a></li>
      <li><a href="#">ca_hasfura@hotmail.com</a></li>
      <li><a href="#">drajennifergarciar@hotmail.com</a></li>
      <li><a href="#">drrafadiaz@cableonda.net</a></li>
      <li><a href="#">efi_camargo@hotmail.com</a></li>
      <li><a href="#">efrainb37@hotmail.com</a></li>
      <li><a href="#">efrainmendoza918@gmail.com</a></li>
      <li><a href="#">efriasort02@hotmail.com</a></li>
      <li><a href="#">emilyfloresdiaz@gmail.com</a></li>
      <li><a href="#">eriferna@hotmail.com</a></li>
      <li><a href="#">fatimaabdel8@hotmail.com</a></li>
      <li><a href="#">felcast999@gmail.com</a></li>
      <li><a href="#">felipe@mail.com</a></li>
      <li><a href="#">fercastellanos30@gmail.com</a></li>
      <li><a href="#">ferivanruso@yahoo.com</a></li>
      <li><a href="#">Fernanda@gmail.com</a></li>
      <li><a href="#">ferrarielimortal@hotmail.com</a></li>
      <li><a href="#">fidel.gonzalez1916@gmail.com</a></li>
      <li><a href="#">fisio.abouganem@gmail.com</a></li>
      <li><a href="#">fjbg39@hotmail.com</a></li>
      <li><a href="#">fmp@gmail.com</a></li>
      <li><a href="#">freddycabello@gmail.com</a></li>
      <li><a href="#">gfm13@hotmail.com</a></li>
      <li><a href="#">info@clinicaser.me</a></li>
      <li><a href="#">info@medicaldentpty.com</a></li>
      <li><a href="#">ing.frankcatamo123@gmail.com</a></li>
      <li><a href="#">ing.frankcatamo@gmail.com</a></li>
      <li><a href="#">ivanjfc@gmail.com</a></li>
      <li><a href="#">j.effio@grupomedicopanama.com</a></li>
      <li><a href="#">jeffersonrojas37@gmail.com</a></li>
      <li><a href="#">jolmedo@centromedicofem.com</a></li>
      <li><a href="#">leorfamaria@gmail.com</a></li>
      <li><a href="#">maildrop@alumni.stanford.edu</a></li>
      <li><a href="#">manuelfcheno@gmail.com</a></li>
      <li><a href="#">mfortizmaxilofacial@gmail.com</a></li>
      <li><a href="#">millyfernandez@gmail.com</a></li>
      <li><a href="#">mundofetal.org@gmail.com</a></li>
      <li><a href="#">nefthaly.montenegro@gmail.com</a></li>
      <li><a href="#">nina.falconette@hotmail.com</a></li>
      <li><a href="#">pf@gmail.com</a></li>
      <li><a href="#">profesional2@mail.com</a></li>
      <li><a href="#">rafael.b@gmail.com</a></li>
      <li><a href="#">rafael@pixsolution.tech</a></li>
      <li><a href="#">rafa_hema@hotmail.com</a></li>
      <li><a href="#">ramonferrerl@hotmail.com</a></li>
      <li><a href="#">rdufvcjabn_1544578885@tfbnw.net</a></li>
      <li><a href="#">Rengifo.ana@hotmail.com</a></li>
      <li><a href="#">rpfulg@gmail.com</a></li>
      <li><a href="#">sofiadanielaosorio@gmail.com</a></li>
      <li><a href="#">staffruthlonena23@yahoo.com</a></li>
      <li><a href="#">taniafraily2608@gmail.com</a></li>
      <li><a href="#">tu-fisio-24@outlook.com</a></li>
      <li><a href="#">yy_francog@yahoo.com</a></li>
      <li><a href="#">zubair@heersoftware.com</a></li>
  </ul>
  </body>
  
  </html>
  `;

  return {
    data: html,
    success: true
  };
};

const mockUserInfo = () => {
  const fakeData = {
    user: {
      id: 482,
      first_name: 'Frank',
      last_name: 'Catamo',
      telefono: 2147483647
    },
    paciente: {
      id: 1817,
      tipo_identificacion: null,
      cedula: null,
      email: 'ing.frankcatamo@gmail.com',
      nombre: 'Frank',
      segundo_nombre: null,
      apellido: 'Catamo',
      segundo_apellido: null,
      fecha_nacimiento: null,
      sexo: null,
      telefono: 2147483647,
      celular: null,
      direccion: null,
      estado_civil: null,
      telefono_laboral: null,
      notas: null,
      pais: null,
      fecha_registro: '2019-04-09',
      user_id: 482
    },
    success: true
  };
  return { data: fakeData, success: true };
};

// get appointment user by id
const mockAppointmentById = () => {
  const fakeData = {
    success: true,
    user: [
      {
        id: 150971,
        slot_date: '2019-04-12',
        inicio: '7:01 am',
        fin: '7:11 am',
        slot_status: 1,
        profile_pic: null,
        doctorId: 295,
        doctorIds: 188,
        pVideo: '10.00',
        tipoConsulta: 'Presencial',
        clinica: 'Institucion_prueba',
        clinicaId: 187,
        detalle: 'prueba',
        telefono: 2147483647,
        tipo_pago: '',
        pago: '0.00',
        id_pago: '',
        paciente_id: 1817,
        name: 'Frank Catamo'
      }
    ],
    paciente: [
      {
        id: 1817,
        tipo_identificacion: null,
        cedula: null,
        email: 'ing.frankcatamo@gmail.com',
        nombre: 'Frank',
        segundo_nombre: null,
        apellido: 'Catamo',
        segundo_apellido: null,
        fecha_nacimiento: null,
        sexo: null,
        telefono: 2147483647,
        celular: null,
        direccion: null,
        estado_civil: null,
        telefono_laboral: null,
        notas: null,
        pais: null,
        fecha_registro: '2019-04-09',
        user_id: 482
      }
    ]
  };
  return { data: fakeData, success: true };
};

const mockAppointmentCreate = () => {
  return {
    data: {},
    success: true
  };
};

const mockAppointmentUpdate = () => {
  return {
    data: {},
    success: true
  };
};

const mockAppointmentCancel = () => {
  return {
    data: {},
    success: true
  };
};

const mockPatientByName = ({ name = null }) => {
  const fakeData = {
    paciente: [
      {
        id: 1817,
        cedula: null,
        nombre: 'Frank',
        segundo_nombre: null,
        apellido: 'Catamo',
        segundo_apellido: null,
        telefono: 2147483647,
        celular: null,
        telefono_laboral: null
      },
      {
        id: 610,
        cedula: 'E8-115959',
        nombre: 'WILLEM',
        segundo_nombre: 'NULL',
        apellido: 'FRANKE',
        segundo_apellido: 'NULL',
        telefono: 6672,
        celular: 0,
        telefono_laboral: 0
      },
      {
        id: 1194,
        cedula: 'NULL',
        nombre: 'FRANKLIN',
        segundo_nombre: 'NULL',
        apellido: 'OTHON',
        segundo_apellido: 'NULL',
        telefono: 6140,
        celular: 0,
        telefono_laboral: 0
      },
      {
        id: 1744,
        cedula: '9-183-59',
        nombre: 'FRANKLIN',
        segundo_nombre: 'NULL',
        apellido: 'VERGARA',
        segundo_apellido: 'NULL',
        telefono: 6578,
        celular: 0,
        telefono_laboral: 0
      }
    ],
    success: true
  };
  if (name !== null) {
    const { paciente } = fakeData;
    const filteredPatients = paciente.filter(
      ({ nombre, apellido }) =>
        `${nombre} ${apellido}`.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
    return {
      data: {
        paciente: filteredPatients,
        success: true
      },
      success: true
    };
  }
  return {
    success: true,
    data: fakeData
  };
};

module.exports = {
  mockAllAppointment,
  mockBasicInfo,
  mockEmailInfo,
  mockUserInfo,
  mockAppointmentById,
  mockAppointmentByDate,
  mockAppointmentCreate,
  mockAppointmentUpdate,
  mockAppointmentCancel,
  mockPatientByName
};
