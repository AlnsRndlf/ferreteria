// ========================================
// CATALOGO DE PRODUCTOS
// Datos reales tomados del catalogo de
// Ferreteria Los Maestros (85 productos).
// ========================================

const productos = [

    {
        codigo: 'MC001',
        categoria: 'Materiales de construcción',
        subcategoria: 'Cementos',
        nombre: 'Cemento Polpaico gris 25 kg',
        marca: 'Polpaico',
        unidad: 'Saco',
        descripcion: 'Cemento Polpaico gris 25 kg, de la marca Polpaico, dentro de nuestra línea de cementos. Producto ideal para trabajos de construcción y albañilería.',
        precio: 5990,
        stock: 80,
        stockMinimo: 20,
        imagen: null
    },

    {
        codigo: 'MC002',
        categoria: 'Materiales de construcción',
        subcategoria: 'Cementos',
        nombre: 'Cemento Melón blanco 25 kg',
        marca: 'Melón',
        unidad: 'Saco',
        descripcion: 'Cemento Melón blanco 25 kg, de la marca Melón, dentro de nuestra línea de cementos. Producto ideal para trabajos de construcción y albañilería.',
        precio: 7490,
        stock: 40,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'MC003',
        categoria: 'Materiales de construcción',
        subcategoria: 'Morteros',
        nombre: 'Mortero cola cerámica 25 kg',
        marca: 'Volcán',
        unidad: 'Saco',
        descripcion: 'Mortero cola cerámica 25 kg, de la marca Volcán, dentro de nuestra línea de morteros. Producto ideal para trabajos de construcción y albañilería.',
        precio: 5200,
        stock: 50,
        stockMinimo: 15,
        imagen: null
    },

    {
        codigo: 'MC004',
        categoria: 'Materiales de construcción',
        subcategoria: 'Morteros',
        nombre: 'Mortero nivelador piso 25 kg',
        marca: 'Weber',
        unidad: 'Saco',
        descripcion: 'Mortero nivelador piso 25 kg, de la marca Weber, dentro de nuestra línea de morteros. Producto ideal para trabajos de construcción y albañilería.',
        precio: 6490,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'MC005',
        categoria: 'Materiales de construcción',
        subcategoria: 'Áridos',
        nombre: 'Arena fina construcción 25 kg',
        marca: 'Granel',
        unidad: 'Saco',
        descripcion: 'Arena fina construcción 25 kg, de la marca Granel, dentro de nuestra línea de áridos. Producto ideal para trabajos de construcción y albañilería.',
        precio: 1800,
        stock: 60,
        stockMinimo: 20,
        imagen: null
    },

    {
        codigo: 'MC006',
        categoria: 'Materiales de construcción',
        subcategoria: 'Áridos',
        nombre: 'Ripio 25 kg',
        marca: 'Granel',
        unidad: 'Saco',
        descripcion: 'Ripio 25 kg, de la marca Granel, dentro de nuestra línea de áridos. Producto ideal para trabajos de construcción y albañilería.',
        precio: 1500,
        stock: 60,
        stockMinimo: 20,
        imagen: null
    },

    {
        codigo: 'MC007',
        categoria: 'Materiales de construcción',
        subcategoria: 'Ladrillos',
        nombre: 'Ladrillo fiscal N°5',
        marca: 'Local',
        unidad: 'Unidad',
        descripcion: 'Ladrillo fiscal N°5, de la marca Local, dentro de nuestra línea de ladrillos. Producto ideal para trabajos de construcción y albañilería.',
        precio: 380,
        stock: 500,
        stockMinimo: 100,
        imagen: null
    },

    {
        codigo: 'MC008',
        categoria: 'Materiales de construcción',
        subcategoria: 'Ladrillos',
        nombre: 'Ladrillo prensado 6x14x29 cm',
        marca: 'Melón',
        unidad: 'Unidad',
        descripcion: 'Ladrillo prensado 6x14x29 cm, de la marca Melón, dentro de nuestra línea de ladrillos. Producto ideal para trabajos de construcción y albañilería.',
        precio: 550,
        stock: 300,
        stockMinimo: 80,
        imagen: null
    },

    {
        codigo: 'MC009',
        categoria: 'Materiales de construcción',
        subcategoria: 'Bloques',
        nombre: 'Bloque de hormigón 19x19x39 cm',
        marca: 'Volcán',
        unidad: 'Unidad',
        descripcion: 'Bloque de hormigón 19x19x39 cm, de la marca Volcán, dentro de nuestra línea de bloques. Producto ideal para trabajos de construcción y albañilería.',
        precio: 1200,
        stock: 200,
        stockMinimo: 50,
        imagen: null
    },

    {
        codigo: 'MC010',
        categoria: 'Materiales de construcción',
        subcategoria: 'Bloques',
        nombre: 'Bloque liviano 10x20x40 cm',
        marca: 'Ytong',
        unidad: 'Unidad',
        descripcion: 'Bloque liviano 10x20x40 cm, de la marca Ytong, dentro de nuestra línea de bloques. Producto ideal para trabajos de construcción y albañilería.',
        precio: 1690,
        stock: 100,
        stockMinimo: 30,
        imagen: null
    },

    {
        codigo: 'PT001',
        categoria: 'Pinturas',
        subcategoria: 'Látex',
        nombre: 'Pintura látex interior 1 galón blanco',
        marca: 'Sipa',
        unidad: 'Galón',
        descripcion: 'Pintura látex formulada especialmente para espacios interiores. Ofrece un acabado mate de alta calidad y excelente cubrimiento.',
        precio: 9990,
        stock: 40,
        stockMinimo: 10,
        imagen: 'assets/img/pintura-sipa.png'
    },

    {
        codigo: 'PT002',
        categoria: 'Pinturas',
        subcategoria: 'Látex',
        nombre: 'Pintura látex interior 4 litros (varios col.)',
        marca: 'Sipa',
        unidad: 'Envase 4L',
        descripcion: 'Pintura látex interior 4 litros (varios col.), de la marca Sipa, dentro de nuestra línea de látex. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 12990,
        stock: 30,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'PT003',
        categoria: 'Pinturas',
        subcategoria: 'Látex',
        nombre: 'Pintura látex exterior 1 galón blanco',
        marca: 'Kömex',
        unidad: 'Galón',
        descripcion: 'Pintura látex exterior 1 galón blanco, de la marca Kömex, dentro de nuestra línea de látex. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 13990,
        stock: 25,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'PT004',
        categoria: 'Pinturas',
        subcategoria: 'Esmalte',
        nombre: 'Esmalte sintético 1/4 litro (varios col.)',
        marca: 'Sipa',
        unidad: '1/4 L',
        descripcion: 'Esmalte sintético 1/4 litro (varios col.), de la marca Sipa, dentro de nuestra línea de esmalte. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 4290,
        stock: 50,
        stockMinimo: 15,
        imagen: null
    },

    {
        codigo: 'PT005',
        categoria: 'Pinturas',
        subcategoria: 'Esmalte',
        nombre: 'Esmalte sintético 1 litro (varios col.)',
        marca: 'Sipa',
        unidad: '1 litro',
        descripcion: 'Esmalte sintético 1 litro (varios col.), de la marca Sipa, dentro de nuestra línea de esmalte. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 9490,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'PT006',
        categoria: 'Pinturas',
        subcategoria: 'Antihumedad',
        nombre: 'Pintura antihumedad 1 galón blanco',
        marca: 'Kömex',
        unidad: 'Galón',
        descripcion: 'Pintura antihumedad 1 galón blanco, de la marca Kömex, dentro de nuestra línea de antihumedad. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 17990,
        stock: 15,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'PT007',
        categoria: 'Pinturas',
        subcategoria: 'Accesorios',
        nombre: 'Rodillo lana 23 cm con mango',
        marca: 'Wurth',
        unidad: 'Unidad',
        descripcion: 'Rodillo lana 23 cm con mango, de la marca Wurth, dentro de nuestra línea de accesorios. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 3990,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'PT008',
        categoria: 'Pinturas',
        subcategoria: 'Accesorios',
        nombre: 'Brocha cerda natural 3"',
        marca: 'Sipa',
        unidad: 'Unidad',
        descripcion: 'Brocha cerda natural 3", de la marca Sipa, dentro de nuestra línea de accesorios. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 1690,
        stock: 40,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'PT009',
        categoria: 'Pinturas',
        subcategoria: 'Accesorios',
        nombre: 'Cinta de enmascarar 24mm x 50m',
        marca: '3M',
        unidad: 'Rollo',
        descripcion: 'Cinta de enmascarar 24mm x 50m, de la marca 3M, dentro de nuestra línea de accesorios. Producto pensado para renovar y proteger superficies con buena terminación.',
        precio: 2490,
        stock: 60,
        stockMinimo: 20,
        imagen: null
    },

    {
        codigo: 'HM001',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Martillo carpintero 500g',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Martillo de carpintero con cabeza de acero templado y mango de madera. El clásico de toda la vida, ideal para trabajos generales de carpintería y montaje.',
        precio: 7990,
        stock: 20,
        stockMinimo: 5,
        imagen: 'assets/img/martillo.png'
    },

    {
        codigo: 'HM002',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Alicate universal 8"',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Alicate universal 8", de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 7290,
        stock: 15,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'HM003',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Destornillador plano 6x100mm',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Destornillador plano 6x100mm, de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 1990,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'HM004',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Destornillador Phillips PH2 6x100mm',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Destornillador Phillips PH2 6x100mm, de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 1990,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'HM005',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Llave ajustable 10"',
        marca: 'Bahco',
        unidad: 'Unidad',
        descripcion: 'Llave ajustable 10", de la marca Bahco, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 8490,
        stock: 12,
        stockMinimo: 4,
        imagen: null
    },

    {
        codigo: 'HM006',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Juego llaves hexagonales métrico x9',
        marca: 'Stanley',
        unidad: 'Set',
        descripcion: 'Juego llaves hexagonales métrico x9, de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 5490,
        stock: 15,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'HM007',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Serrucho 20" 7 dientes por pulgada',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Serrucho 20" 7 dientes por pulgada, de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 9490,
        stock: 10,
        stockMinimo: 3,
        imagen: null
    },

    {
        codigo: 'HM008',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Nivel de burbuja 60 cm',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Nivel de burbuja 60 cm, de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 10490,
        stock: 8,
        stockMinimo: 3,
        imagen: null
    },

    {
        codigo: 'HM009',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Metro de tela 5m',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Metro de tela 5m, de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 4290,
        stock: 25,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'HM010',
        categoria: 'Herramientas',
        subcategoria: 'Manuales',
        nombre: 'Cinta métrica 8m autoblocante',
        marca: 'Stanley',
        unidad: 'Unidad',
        descripcion: 'Cinta métrica 8m autoblocante, de la marca Stanley, dentro de nuestra línea de manuales. Producto pensado para uso profesional y doméstico.',
        precio: 6490,
        stock: 20,
        stockMinimo: 6,
        imagen: null
    },

    {
        codigo: 'HE001',
        categoria: 'Herramientas',
        subcategoria: 'Eléctricas',
        nombre: 'Taladro percutor 650W 13mm',
        marca: 'Makita',
        unidad: 'Unidad',
        descripcion: 'Taladro percutor 650W 13mm, de la marca Makita, dentro de nuestra línea de eléctricas. Producto pensado para uso profesional y doméstico.',
        precio: 79990,
        stock: 8,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'HE002',
        categoria: 'Herramientas',
        subcategoria: 'Eléctricas',
        nombre: 'Atornillador inalámbrico 12V (kit)',
        marca: 'Makita',
        unidad: 'Unidad',
        descripcion: 'Atornillador inalámbrico 12V (kit), de la marca Makita, dentro de nuestra línea de eléctricas. Producto pensado para uso profesional y doméstico.',
        precio: 104990,
        stock: 5,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'HE003',
        categoria: 'Herramientas',
        subcategoria: 'Eléctricas',
        nombre: 'Amoladora angular 4.5" 800W',
        marca: 'Makita',
        unidad: 'Unidad',
        descripcion: 'Amoladora angular 4.5" 800W, de la marca Makita, dentro de nuestra línea de eléctricas. Producto pensado para uso profesional y doméstico.',
        precio: 54990,
        stock: 8,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'HE004',
        categoria: 'Herramientas',
        subcategoria: 'Eléctricas',
        nombre: 'Sierra circular 7-1/4" 1200W',
        marca: 'Skil',
        unidad: 'Unidad',
        descripcion: 'Sierra circular 7-1/4" 1200W, de la marca Skil, dentro de nuestra línea de eléctricas. Producto pensado para uso profesional y doméstico.',
        precio: 72990,
        stock: 4,
        stockMinimo: 1,
        imagen: null
    },

    {
        codigo: 'HE005',
        categoria: 'Herramientas',
        subcategoria: 'Eléctricas',
        nombre: 'Lijadora orbital 180W',
        marca: 'Black+Decker',
        unidad: 'Unidad',
        descripcion: 'Lijadora orbital 180W, de la marca Black+Decker, dentro de nuestra línea de eléctricas. Producto pensado para uso profesional y doméstico.',
        precio: 34990,
        stock: 6,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'HE006',
        categoria: 'Herramientas',
        subcategoria: 'Eléctricas',
        nombre: 'Caladora 500W',
        marca: 'Skil',
        unidad: 'Unidad',
        descripcion: 'Caladora 500W, de la marca Skil, dentro de nuestra línea de eléctricas. Producto pensado para uso profesional y doméstico.',
        precio: 42990,
        stock: 4,
        stockMinimo: 1,
        imagen: null
    },

    {
        codigo: 'GS001',
        categoria: 'Gasfitería',
        subcategoria: 'Tuberías',
        nombre: 'Cañería PVC 1/2" x 6m',
        marca: 'Tigre',
        unidad: 'Unidad',
        descripcion: 'Cañería PVC 1/2" x 6m, de la marca Tigre, dentro de nuestra línea de tuberías. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 5490,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'GS002',
        categoria: 'Gasfitería',
        subcategoria: 'Tuberías',
        nombre: 'Cañería PVC 3/4" x 6m',
        marca: 'Tigre',
        unidad: 'Unidad',
        descripcion: 'Cañería PVC 3/4" x 6m, de la marca Tigre, dentro de nuestra línea de tuberías. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 7490,
        stock: 25,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'GS003',
        categoria: 'Gasfitería',
        subcategoria: 'Tuberías',
        nombre: 'Cañería cobre 1/2" x 5m',
        marca: 'Codelco',
        unidad: 'Unidad',
        descripcion: 'Cañería cobre 1/2" x 5m, de la marca Codelco, dentro de nuestra línea de tuberías. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 17990,
        stock: 15,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'GS004',
        categoria: 'Gasfitería',
        subcategoria: 'Uniones',
        nombre: 'Codo PVC 1/2" 90°',
        marca: 'Tigre',
        unidad: 'Unidad',
        descripcion: 'Codo PVC 1/2" 90°, de la marca Tigre, dentro de nuestra línea de uniones. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 390,
        stock: 100,
        stockMinimo: 30,
        imagen: null
    },

    {
        codigo: 'GS005',
        categoria: 'Gasfitería',
        subcategoria: 'Uniones',
        nombre: 'Te PVC 1/2"',
        marca: 'Tigre',
        unidad: 'Unidad',
        descripcion: 'Te PVC 1/2", de la marca Tigre, dentro de nuestra línea de uniones. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 450,
        stock: 80,
        stockMinimo: 25,
        imagen: null
    },

    {
        codigo: 'GS006',
        categoria: 'Gasfitería',
        subcategoria: 'Uniones',
        nombre: 'Unión doble PVC 1/2"',
        marca: 'Tigre',
        unidad: 'Unidad',
        descripcion: 'Unión doble PVC 1/2", de la marca Tigre, dentro de nuestra línea de uniones. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 320,
        stock: 80,
        stockMinimo: 25,
        imagen: null
    },

    {
        codigo: 'GS007',
        categoria: 'Gasfitería',
        subcategoria: 'Llaves',
        nombre: 'Llave de paso esfera 1/2" latón',
        marca: 'Emmeti',
        unidad: 'Unidad',
        descripcion: 'Llave de paso esfera 1/2" latón, de la marca Emmeti, dentro de nuestra línea de llaves. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 3490,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'GS008',
        categoria: 'Gasfitería',
        subcategoria: 'Llaves',
        nombre: 'Llave de paso esfera 3/4" latón',
        marca: 'Emmeti',
        unidad: 'Unidad',
        descripcion: 'Llave de paso esfera 3/4" latón, de la marca Emmeti, dentro de nuestra línea de llaves. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 4990,
        stock: 20,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'GS009',
        categoria: 'Gasfitería',
        subcategoria: 'Grifería',
        nombre: 'Grifería lavamanos monocomando cromo',
        marca: 'Corona',
        unidad: 'Unidad',
        descripcion: 'Grifería lavamanos monocomando cromo, de la marca Corona, dentro de nuestra línea de grifería. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 22990,
        stock: 10,
        stockMinimo: 3,
        imagen: null
    },

    {
        codigo: 'GS010',
        categoria: 'Gasfitería',
        subcategoria: 'Grifería',
        nombre: 'Grifería cocina monocomando cuello alto',
        marca: 'Corona',
        unidad: 'Unidad',
        descripcion: 'Grifería cocina monocomando cuello alto, de la marca Corona, dentro de nuestra línea de grifería. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 28990,
        stock: 8,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'GS011',
        categoria: 'Gasfitería',
        subcategoria: 'Sellos',
        nombre: 'Teflón 3/4" x 12m',
        marca: '3M',
        unidad: 'Rollo',
        descripcion: 'Teflón 3/4" x 12m, de la marca 3M, dentro de nuestra línea de sellos. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 790,
        stock: 80,
        stockMinimo: 25,
        imagen: null
    },

    {
        codigo: 'GS012',
        categoria: 'Gasfitería',
        subcategoria: 'Sellos',
        nombre: 'Silicona transparente 280ml',
        marca: 'Wacker',
        unidad: 'Cartucho',
        descripcion: 'Silicona transparente 280ml, de la marca Wacker, dentro de nuestra línea de sellos. Producto para instalaciones y reparaciones de gasfitería.',
        precio: 5490,
        stock: 25,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'EL001',
        categoria: 'Electricidad',
        subcategoria: 'Conductores',
        nombre: 'Cable unipolar 1.5mm² (por metro)',
        marca: 'Condulac',
        unidad: 'Metro',
        descripcion: 'Cable unipolar 1.5mm² (por metro), de la marca Condulac, dentro de nuestra línea de conductores. Producto apto para instalaciones eléctricas residenciales.',
        precio: 590,
        stock: 100,
        stockMinimo: 30,
        imagen: null
    },

    {
        codigo: 'EL002',
        categoria: 'Electricidad',
        subcategoria: 'Conductores',
        nombre: 'Cable unipolar 2.5mm² (por metro)',
        marca: 'Condulac',
        unidad: 'Metro',
        descripcion: 'Cable unipolar 2.5mm² (por metro), de la marca Condulac, dentro de nuestra línea de conductores. Producto apto para instalaciones eléctricas residenciales.',
        precio: 790,
        stock: 100,
        stockMinimo: 30,
        imagen: null
    },

    {
        codigo: 'EL003',
        categoria: 'Electricidad',
        subcategoria: 'Conductores',
        nombre: 'Cable dúplex paralelo 2x1.5mm² (por metro)',
        marca: 'Condulac',
        unidad: 'Metro',
        descripcion: 'Cable dúplex paralelo 2x1.5mm² (por metro), de la marca Condulac, dentro de nuestra línea de conductores. Producto apto para instalaciones eléctricas residenciales.',
        precio: 990,
        stock: 80,
        stockMinimo: 25,
        imagen: null
    },

    {
        codigo: 'EL004',
        categoria: 'Electricidad',
        subcategoria: 'Enchufes',
        nombre: 'Enchufe empotrar 16A c/tierra (schuko)',
        marca: 'Bticino',
        unidad: 'Unidad',
        descripcion: 'Enchufe empotrar 16A c/tierra (schuko), de la marca Bticino, dentro de nuestra línea de enchufes. Producto apto para instalaciones eléctricas residenciales.',
        precio: 3690,
        stock: 50,
        stockMinimo: 15,
        imagen: null
    },

    {
        codigo: 'EL005',
        categoria: 'Electricidad',
        subcategoria: 'Enchufes',
        nombre: 'Enchufe doble empotrar 16A c/tierra',
        marca: 'Bticino',
        unidad: 'Unidad',
        descripcion: 'Enchufe doble empotrar 16A c/tierra, de la marca Bticino, dentro de nuestra línea de enchufes. Producto apto para instalaciones eléctricas residenciales.',
        precio: 5490,
        stock: 40,
        stockMinimo: 12,
        imagen: null
    },

    {
        codigo: 'EL006',
        categoria: 'Electricidad',
        subcategoria: 'Interruptores',
        nombre: 'Interruptor simple empotrar',
        marca: 'Bticino',
        unidad: 'Unidad',
        descripcion: 'Interruptor simple empotrar, de la marca Bticino, dentro de nuestra línea de interruptores. Producto apto para instalaciones eléctricas residenciales.',
        precio: 3190,
        stock: 50,
        stockMinimo: 15,
        imagen: null
    },

    {
        codigo: 'EL007',
        categoria: 'Electricidad',
        subcategoria: 'Interruptores',
        nombre: 'Interruptor doble empotrar',
        marca: 'Bticino',
        unidad: 'Unidad',
        descripcion: 'Interruptor doble empotrar, de la marca Bticino, dentro de nuestra línea de interruptores. Producto apto para instalaciones eléctricas residenciales.',
        precio: 4290,
        stock: 35,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'EL008',
        categoria: 'Electricidad',
        subcategoria: 'Tableros',
        nombre: 'Tablero eléctrico 4 espacios DIN',
        marca: 'Legrand',
        unidad: 'Unidad',
        descripcion: 'Tablero eléctrico 4 espacios DIN, de la marca Legrand, dentro de nuestra línea de tableros. Producto apto para instalaciones eléctricas residenciales.',
        precio: 22990,
        stock: 8,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'EL009',
        categoria: 'Electricidad',
        subcategoria: 'Tableros',
        nombre: 'Disyuntor termomagnético 16A unipolar',
        marca: 'Schneider',
        unidad: 'Unidad',
        descripcion: 'Disyuntor termomagnético 16A unipolar, de la marca Schneider, dentro de nuestra línea de tableros. Producto apto para instalaciones eléctricas residenciales.',
        precio: 6490,
        stock: 20,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'EL010',
        categoria: 'Electricidad',
        subcategoria: 'Tableros',
        nombre: 'Disyuntor termomagnético 25A unipolar',
        marca: 'Schneider',
        unidad: 'Unidad',
        descripcion: 'Disyuntor termomagnético 25A unipolar, de la marca Schneider, dentro de nuestra línea de tableros. Producto apto para instalaciones eléctricas residenciales.',
        precio: 6990,
        stock: 20,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'EL011',
        categoria: 'Electricidad',
        subcategoria: 'Iluminación',
        nombre: 'Ampolleta LED 9W E27 luz fría',
        marca: 'Philips',
        unidad: 'Unidad',
        descripcion: 'Ampolleta LED 9W E27 luz fría, de la marca Philips, dentro de nuestra línea de iluminación. Producto apto para instalaciones eléctricas residenciales.',
        precio: 3990,
        stock: 60,
        stockMinimo: 20,
        imagen: null
    },

    {
        codigo: 'EL012',
        categoria: 'Electricidad',
        subcategoria: 'Iluminación',
        nombre: 'Ampolleta LED 12W E27 luz cálida',
        marca: 'Philips',
        unidad: 'Unidad',
        descripcion: 'Ampolleta LED 12W E27 luz cálida, de la marca Philips, dentro de nuestra línea de iluminación. Producto apto para instalaciones eléctricas residenciales.',
        precio: 4490,
        stock: 50,
        stockMinimo: 15,
        imagen: null
    },

    {
        codigo: 'EL013',
        categoria: 'Electricidad',
        subcategoria: 'Iluminación',
        nombre: 'Panel LED empotrar 18W 22cm',
        marca: 'Ledvance',
        unidad: 'Unidad',
        descripcion: 'Panel LED empotrar 18W 22cm, de la marca Ledvance, dentro de nuestra línea de iluminación. Producto apto para instalaciones eléctricas residenciales.',
        precio: 11490,
        stock: 20,
        stockMinimo: 6,
        imagen: null
    },

    {
        codigo: 'TR001',
        categoria: 'Tornillería',
        subcategoria: 'Tornillos',
        nombre: 'Tornillo autoperf. 8x1" caja 100 unid.',
        marca: 'Hilti',
        unidad: 'Caja',
        descripcion: 'Tornillo autoperf. 8x1" caja 100 unid., de la marca Hilti, dentro de nuestra línea de tornillos. Producto para fijaciones y montajes en general.',
        precio: 2990,
        stock: 40,
        stockMinimo: 12,
        imagen: null
    },

    {
        codigo: 'TR002',
        categoria: 'Tornillería',
        subcategoria: 'Tornillos',
        nombre: 'Tornillo madera 4x40mm caja 100 unid.',
        marca: 'Hilti',
        unidad: 'Caja',
        descripcion: 'Tornillo madera 4x40mm caja 100 unid., de la marca Hilti, dentro de nuestra línea de tornillos. Producto para fijaciones y montajes en general.',
        precio: 2490,
        stock: 40,
        stockMinimo: 12,
        imagen: null
    },

    {
        codigo: 'TR003',
        categoria: 'Tornillería',
        subcategoria: 'Tornillos',
        nombre: 'Tornillo volcanita 3.5x25mm caja 200 unid.',
        marca: 'Hilti',
        unidad: 'Caja',
        descripcion: 'Tornillo volcanita 3.5x25mm caja 200 unid., de la marca Hilti, dentro de nuestra línea de tornillos. Producto para fijaciones y montajes en general.',
        precio: 3490,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'TR004',
        categoria: 'Tornillería',
        subcategoria: 'Tacos',
        nombre: 'Taco fisher S6 bolsa 100 unid.',
        marca: 'Fischer',
        unidad: 'Bolsa',
        descripcion: 'Taco fisher S6 bolsa 100 unid., de la marca Fischer, dentro de nuestra línea de tacos. Producto para fijaciones y montajes en general.',
        precio: 3190,
        stock: 35,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'TR005',
        categoria: 'Tornillería',
        subcategoria: 'Tacos',
        nombre: 'Taco fisher S8 bolsa 50 unid.',
        marca: 'Fischer',
        unidad: 'Bolsa',
        descripcion: 'Taco fisher S8 bolsa 50 unid., de la marca Fischer, dentro de nuestra línea de tacos. Producto para fijaciones y montajes en general.',
        precio: 2890,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'TR006',
        categoria: 'Tornillería',
        subcategoria: 'Pernos',
        nombre: 'Perno hex. 3/8" x 2" c/tuerca y golilla',
        marca: 'Granel',
        unidad: 'Unidad',
        descripcion: 'Perno hex. 3/8" x 2" c/tuerca y golilla, de la marca Granel, dentro de nuestra línea de pernos. Producto para fijaciones y montajes en general.',
        precio: 290,
        stock: 200,
        stockMinimo: 50,
        imagen: null
    },

    {
        codigo: 'TR007',
        categoria: 'Tornillería',
        subcategoria: 'Anclajes',
        nombre: 'Perno de anclaje 10x100mm',
        marca: 'Hilti',
        unidad: 'Unidad',
        descripcion: 'Perno de anclaje 10x100mm, de la marca Hilti, dentro de nuestra línea de anclajes. Producto para fijaciones y montajes en general.',
        precio: 990,
        stock: 60,
        stockMinimo: 15,
        imagen: null
    },

    {
        codigo: 'TR008',
        categoria: 'Tornillería',
        subcategoria: 'Anclajes',
        nombre: 'Anclaje químico epoxi 300ml',
        marca: 'Fischer',
        unidad: 'Cartucho',
        descripcion: 'Anclaje químico epoxi 300ml, de la marca Fischer, dentro de nuestra línea de anclajes. Producto para fijaciones y montajes en general.',
        precio: 15990,
        stock: 8,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'MD001',
        categoria: 'Madera',
        subcategoria: 'Pino cepillado',
        nombre: 'Pino cepillado 1x3" x 3m',
        marca: 'Local',
        unidad: 'Unidad',
        descripcion: 'Pino cepillado 1x3" x 3m, de la marca Local, dentro de nuestra línea de pino cepillado. Producto útil en trabajos de carpintería y estructuras livianas.',
        precio: 4290,
        stock: 40,
        stockMinimo: 12,
        imagen: null
    },

    {
        codigo: 'MD002',
        categoria: 'Madera',
        subcategoria: 'Pino cepillado',
        nombre: 'Pino cepillado 2x4" x 3m',
        marca: 'Local',
        unidad: 'Unidad',
        descripcion: 'Pino cepillado 2x4" x 3m, de la marca Local, dentro de nuestra línea de pino cepillado. Producto útil en trabajos de carpintería y estructuras livianas.',
        precio: 7490,
        stock: 30,
        stockMinimo: 10,
        imagen: null
    },

    {
        codigo: 'MD003',
        categoria: 'Madera',
        subcategoria: 'Tableros',
        nombre: 'Terciado estructural 18mm 1.22x2.44m',
        marca: 'Arauco',
        unidad: 'Plancha',
        descripcion: 'Terciado estructural 18mm 1.22x2.44m, de la marca Arauco, dentro de nuestra línea de tableros. Producto útil en trabajos de carpintería y estructuras livianas.',
        precio: 34990,
        stock: 20,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'MD004',
        categoria: 'Madera',
        subcategoria: 'Tableros',
        nombre: 'MDF 15mm 1.22x2.44m',
        marca: 'Arauco',
        unidad: 'Plancha',
        descripcion: 'MDF 15mm 1.22x2.44m, de la marca Arauco, dentro de nuestra línea de tableros. Producto útil en trabajos de carpintería y estructuras livianas.',
        precio: 27990,
        stock: 15,
        stockMinimo: 4,
        imagen: null
    },

    {
        codigo: 'MD005',
        categoria: 'Madera',
        subcategoria: 'Tableros',
        nombre: 'OSB 9mm 1.22x2.44m',
        marca: 'Arauco',
        unidad: 'Plancha',
        descripcion: 'OSB 9mm 1.22x2.44m, de la marca Arauco, dentro de nuestra línea de tableros. Producto útil en trabajos de carpintería y estructuras livianas.',
        precio: 18990,
        stock: 18,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'MD006',
        categoria: 'Madera',
        subcategoria: 'Tableros',
        nombre: 'Volcanita estándar 10mm 1.2x2.4m',
        marca: 'Volcán',
        unidad: 'Plancha',
        descripcion: 'Volcanita estándar 10mm 1.2x2.4m, de la marca Volcán, dentro de nuestra línea de tableros. Producto útil en trabajos de carpintería y estructuras livianas.',
        precio: 8990,
        stock: 30,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'MD007',
        categoria: 'Madera',
        subcategoria: 'Tableros',
        nombre: 'Volcanita resistente humedad 10mm',
        marca: 'Volcán',
        unidad: 'Plancha',
        descripcion: 'Volcanita resistente humedad 10mm, de la marca Volcán, dentro de nuestra línea de tableros. Producto útil en trabajos de carpintería y estructuras livianas.',
        precio: 11990,
        stock: 15,
        stockMinimo: 4,
        imagen: null
    },

    {
        codigo: 'SE001',
        categoria: 'Seguridad',
        subcategoria: 'EPP',
        nombre: 'Casco seguridad blanco',
        marca: '3M',
        unidad: 'Unidad',
        descripcion: 'Casco seguridad blanco, de la marca 3M, dentro de nuestra línea de epp. Producto elemento de protección personal para obras y talleres.',
        precio: 6990,
        stock: 15,
        stockMinimo: 5,
        imagen: null
    },

    {
        codigo: 'SE002',
        categoria: 'Seguridad',
        subcategoria: 'EPP',
        nombre: 'Guantes de cuero talla L',
        marca: '3M',
        unidad: 'Par',
        descripcion: 'Guantes de cuero talla L, de la marca 3M, dentro de nuestra línea de epp. Producto elemento de protección personal para obras y talleres.',
        precio: 3690,
        stock: 20,
        stockMinimo: 6,
        imagen: null
    },

    {
        codigo: 'SE003',
        categoria: 'Seguridad',
        subcategoria: 'EPP',
        nombre: 'Antiparras de seguridad clear',
        marca: '3M',
        unidad: 'Unidad',
        descripcion: 'Antiparras de seguridad clear, de la marca 3M, dentro de nuestra línea de epp. Producto elemento de protección personal para obras y talleres.',
        precio: 2490,
        stock: 25,
        stockMinimo: 8,
        imagen: null
    },

    {
        codigo: 'SE004',
        categoria: 'Seguridad',
        subcategoria: 'EPP',
        nombre: 'Mascarilla respirador N95 (caja x10)',
        marca: '3M',
        unidad: 'Caja',
        descripcion: 'Mascarilla respirador N95 (caja x10), de la marca 3M, dentro de nuestra línea de epp. Producto elemento de protección personal para obras y talleres.',
        precio: 10990,
        stock: 10,
        stockMinimo: 3,
        imagen: null
    },

    {
        codigo: 'SE005',
        categoria: 'Seguridad',
        subcategoria: 'EPP',
        nombre: 'Arnés de seguridad 1 punto',
        marca: '3M',
        unidad: 'Unidad',
        descripcion: 'Arnés de seguridad 1 punto, de la marca 3M, dentro de nuestra línea de epp. Producto elemento de protección personal para obras y talleres.',
        precio: 34990,
        stock: 4,
        stockMinimo: 1,
        imagen: null
    },

    {
        codigo: 'JA001',
        categoria: 'Jardín',
        subcategoria: 'Mangueras',
        nombre: 'Manguera riego 3/4" x 25m',
        marca: 'Tigre',
        unidad: 'Unidad',
        descripcion: 'Manguera riego 3/4" x 25m, de la marca Tigre, dentro de nuestra línea de mangueras. Producto pensado para el cuidado y mantención de espacios exteriores.',
        precio: 22990,
        stock: 6,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'JA002',
        categoria: 'Jardín',
        subcategoria: 'Mangueras',
        nombre: 'Manguera expandible 30m',
        marca: 'Bestway',
        unidad: 'Unidad',
        descripcion: 'Manguera expandible 30m, de la marca Bestway, dentro de nuestra línea de mangueras. Producto pensado para el cuidado y mantención de espacios exteriores.',
        precio: 28990,
        stock: 5,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'JA003',
        categoria: 'Jardín',
        subcategoria: 'Mangueras',
        nombre: 'Pistola de riego 8 modos',
        marca: 'Bestway',
        unidad: 'Unidad',
        descripcion: 'Pistola de riego 8 modos, de la marca Bestway, dentro de nuestra línea de mangueras. Producto pensado para el cuidado y mantención de espacios exteriores.',
        precio: 5490,
        stock: 10,
        stockMinimo: 3,
        imagen: null
    },

    {
        codigo: 'JA004',
        categoria: 'Jardín',
        subcategoria: 'Herramientas',
        nombre: 'Pala punta redonda #2 con mango',
        marca: 'Corona',
        unidad: 'Unidad',
        descripcion: 'Pala punta redonda #2 con mango, de la marca Corona, dentro de nuestra línea de herramientas. Producto pensado para el cuidado y mantención de espacios exteriores.',
        precio: 10990,
        stock: 8,
        stockMinimo: 2,
        imagen: null
    },

    {
        codigo: 'JA005',
        categoria: 'Jardín',
        subcategoria: 'Herramientas',
        nombre: 'Rastrillo 16 dientes con mango',
        marca: 'Corona',
        unidad: 'Unidad',
        descripcion: 'Rastrillo 16 dientes con mango, de la marca Corona, dentro de nuestra línea de herramientas. Producto pensado para el cuidado y mantención de espacios exteriores.',
        precio: 9490,
        stock: 6,
        stockMinimo: 2,
        imagen: null
    }


];


// ========================================
// BUSCAR UN PRODUCTO POR SU CÓDIGO
// ========================================

function buscarProductoPorCodigo(codigo) {

    for (const producto of productos) {

        if (producto.codigo === codigo) {

            return producto;

        }

    }

    return null;

}


// ========================================
// FORMATEAR PRECIO EN PESOS CHILENOS
// Ej: 22990 -> "$22.990"
// ========================================

function formatearPrecio(numero) {

    const texto = String(numero);

    let resultado = '';
    let contador = 0;

    for (let i = texto.length - 1; i >= 0; i--) {

        resultado = texto[i] + resultado;
        contador++;

        if (contador % 3 === 0 && i !== 0) {

            resultado = '.' + resultado;

        }

    }

    return `$${resultado}`;

}
