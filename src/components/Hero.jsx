import { useEffect, useRef, useState, memo } from 'react'

const SKILL_ITEMS = [
  {
    id: '01',
    title: 'Web & Digital',
    sub: 'Architecture',
    bg: '#1a1a1a',
    accent: '#FF3B00',
    type: 'code',
  },
  {
    id: '02',
    title: '3D & CGI',
    sub: 'Kinetic Motion',
    bg: '#FF3B00',
    accent: '#F5C860',
    type: '3d',
  },
  {
    id: '03',
    title: 'Art Direction',
    sub: 'Editorial Film',
    bg: '#161616',
    accent: '#FFFFFF',
    type: 'photo',
  },
  {
    id: '04',
    title: 'Brand Identity',
    sub: 'Swiss Typography',
    bg: '#252525',
    accent: '#95D9F4',
    type: 'brand',
  },
  {
    id: '05',
    title: 'Motion Design',
    sub: 'Generative Art',
    bg: '#FF3B00',
    accent: '#FFFFFF',
    type: 'motion',
  },
  {
    id: '06',
    title: 'Spatial Audio',
    sub: 'Interactive UX',
    bg: '#0F172A',
    accent: '#38BDF8',
    type: 'audio',
  },
]

export default memo(function Hero() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [activeSkill, setActiveSkill] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl', { alpha: false, depth: false, antialias: true }) ||
               canvas.getContext('experimental-webgl')
    if (!gl) return

    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `

    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_ripples[12];
      uniform float u_ripples_amp[12];

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 p = uv * aspect;

        // Minimal, calm ambient water presence (very subtle micro-shimmer)
        float h = sin(p.x * 3.0 + u_time * 0.6) * cos(p.y * 2.8 + u_time * 0.5) * 0.0025;
        h += sin((p.x + p.y) * 4.0 - u_time * 0.8) * 0.0018;

        // Subtle, localized interactive micro-ripples
        for (int i = 0; i < 12; i++) {
          if (u_ripples[i].z > 0.0) {
            float age = u_time - u_ripples[i].z;
            if (age >= 0.0 && age < 2.0) {
              vec2 center = u_ripples[i].xy * aspect;
              float dist = distance(p, center);
              float waveSpeed = 0.55;
              float waveDist = age * waveSpeed;
              float d = dist - waveDist;
              // Tight, localized ripple envelope that fades quickly
              float amp = u_ripples_amp[i] * exp(-age * 3.2) * exp(-d * d * 380.0);
              h += sin(d * 64.0) * amp;
            }
          }
        }

        // Calculate smooth surface normal with gentle scaling
        float eps = 0.0035;
        float hR = sin((p.x + eps) * 3.0 + u_time * 0.6) * cos(p.y * 2.8 + u_time * 0.5) * 0.0025;
        float hT = sin(p.x * 3.0 + u_time * 0.6) * cos((p.y + eps) * 2.8 + u_time * 0.5) * 0.0025;
        for (int i = 0; i < 12; i++) {
          if (u_ripples[i].z > 0.0) {
            float age = u_time - u_ripples[i].z;
            if (age >= 0.0 && age < 2.0) {
              vec2 center = u_ripples[i].xy * aspect;
              float dR = distance(p + vec2(eps, 0.0), center) - age * 0.55;
              float dT = distance(p + vec2(0.0, eps), center) - age * 0.55;
              hR += sin(dR * 64.0) * u_ripples_amp[i] * exp(-age * 3.2) * exp(-dR * dR * 380.0);
              hT += sin(dT * 64.0) * u_ripples_amp[i] * exp(-age * 3.2) * exp(-dT * dT * 380.0);
            }
          }
        }

        vec3 normal = normalize(vec3(-(hR - h) / eps * 0.09, -(hT - h) / eps * 0.09, 1.0));

        // Very delicate micro-refraction (retains crisp page background)
        vec2 refrUv = uv + normal.xy * 0.005;

        // Pristine warm cream background
        vec3 col = mix(vec3(0.968, 0.957, 0.942), vec3(0.938, 0.922, 0.902), refrUv.y * 0.6 + refrUv.x * 0.4);

        // Soft, faint light illumination on wave crests (no dark murky blotches)
        col += vec3(0.025, 0.022, 0.018) * max(0.0, h * 30.0);

        // Soft, delicate pearlescent light sheen
        vec3 lightDir = normalize(vec3(0.25, 0.65, 0.75));
        vec3 halfVec = normalize(lightDir + vec3(0.0, 0.0, 1.0));
        float spec = pow(max(dot(normal, halfVec), 0.0), 45.0);
        col += vec3(1.0, 0.98, 0.94) * spec * 0.22;

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const createShader = (type, src) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }

    const program = gl.createProgram()
    gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSource))
    gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSource))
    gl.linkProgram(program)
    gl.useProgram(program)

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1,
    ]), gl.STATIC_DRAW)

    const posLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uResLoc = gl.getUniformLocation(program, 'u_resolution')
    const uTimeLoc = gl.getUniformLocation(program, 'u_time')
    const uRipplesLoc = gl.getUniformLocation(program, 'u_ripples')
    const uRipplesAmpLoc = gl.getUniformLocation(program, 'u_ripples_amp')

    // Ripple state ring buffer (12 ripples max)
    const MAX_RIPPLES = 12
    const ripplesFlat = new Float32Array(MAX_RIPPLES * 3) // [x, y, startTime, ...]
    const ripplesAmpFlat = new Float32Array(MAX_RIPPLES)
    let rippleIdx = 0

    const addRipple = (normX, normY, amp = 1.0) => {
      const t = (performance.now() - t0) / 1000
      const base = rippleIdx * 3
      ripplesFlat[base] = normX
      ripplesFlat[base + 1] = normY
      ripplesFlat[base + 2] = t
      ripplesAmpFlat[rippleIdx] = amp
      rippleIdx = (rippleIdx + 1) % MAX_RIPPLES
    }

    let lastX = 0, lastY = 0, lastTime = 0
    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (rect.bottom - e.clientY) / rect.height
      const now = performance.now()
      const dist = Math.hypot(x - lastX, y - lastY)

      if (dist > 0.035 || (now - lastTime > 90 && dist > 0.012)) {
        const speed = Math.min(dist / Math.max(1, (now - lastTime)) * 400, 1.0)
        // Gentle, soft micro-ripple amplitude
        const amp = 0.05 + speed * 0.07
        addRipple(x, y, amp)
        lastX = x
        lastY = y
        lastTime = now
      }
    }

    const onPointerDown = (e) => {
      const rect = container.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (rect.bottom - e.clientY) / rect.height
      // Gentle, soft click ripple
      addRipple(x, y, 0.18)
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(container.clientWidth * dpr)
      canvas.height = Math.round(container.clientHeight * dpr)
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    container.addEventListener('pointermove', onPointerMove, { passive: true })
    container.addEventListener('pointerdown', onPointerDown, { passive: true })

    const t0 = performance.now()
    let rafId

    const render = () => {
      const currentTime = (performance.now() - t0) / 1000
      gl.uniform2f(uResLoc, canvas.width, canvas.height)
      gl.uniform1f(uTimeLoc, currentTime)
      gl.uniform3fv(uRipplesLoc, ripplesFlat)
      gl.uniform1fv(uRipplesAmpLoc, ripplesAmpFlat)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      container.removeEventListener('pointermove', onPointerMove)
      container.removeEventListener('pointerdown', onPointerDown)
      gl.deleteProgram(program)
      gl.deleteBuffer(buffer)
    }
  }, [])

  return (
    <section className="hero-editorial" id="hero" ref={containerRef}>
      {/* Interactive WebGL Water Canvas */}
      <canvas ref={canvasRef} className="hero-water-canvas" />

      {/* Top Giant Brand Bar */}
      <div className="hero-editorial__top">
        <h1 className="hero-editorial__giant-logo">PIXORA</h1>
        <div className="hero-editorial__top-nav">
          <a href="#hero" className="hero-editorial__nav-link">Home ▾</a>
          <a href="#about" className="hero-editorial__nav-link">Pages ▾</a>
          <a href="#projects" className="hero-editorial__nav-link">Project ▾</a>
          <a href="#blog" className="hero-editorial__nav-link">Blog ▾</a>
          <a href="#contact" className="hero-editorial__nav-link">Contact ▾</a>
          <button className="hero-editorial__menu-btn" aria-label="Menu">
            <span /><span />
          </button>
        </div>
      </div>

      {/* Hero Body Grid: Film Strip on Left + Manifesto in Center */}
      <div className="hero-editorial__body">
        {/* The Moving Film Reel of Skills */}
        <aside className="film-reel" aria-label="Creative skills film strip">
          <div className="film-reel__header">
            <span className="film-reel__dot" />
            <span className="film-reel__label">SKILLS REEL</span>
          </div>

          <div className="film-reel__viewport">
            <div className="film-reel__track">
              {/* Double list for smooth infinite scroll loop */}
              {[...SKILL_ITEMS, ...SKILL_ITEMS].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className={`film-reel__card ${activeSkill === item.id ? 'active' : ''}`}
                  onMouseEnter={() => setActiveSkill(item.id)}
                  onMouseLeave={() => setActiveSkill(null)}
                >
                  <div className="film-reel__sprockets film-reel__sprockets--left" />
                  <div className="film-reel__inner" style={{ background: item.bg }}>
                    <div className="film-reel__index">[{item.id}]</div>
                    <div className="film-reel__content">
                      <div className="film-reel__icon" style={{ color: item.accent }}>
                        {item.type === 'code' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="16 18 22 12 16 6" />
                            <polyline points="8 6 2 12 8 18" />
                          </svg>
                        )}
                        {item.type === '3d' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          </svg>
                        )}
                        {item.type === 'photo' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" />
                          </svg>
                        )}
                        {item.type === 'brand' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <path d="M9 3v18M3 9h18" />
                          </svg>
                        )}
                        {item.type === 'motion' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        )}
                        {item.type === 'audio' && (
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                        )}
                      </div>
                      <span className="film-reel__title">{item.title}</span>
                      <span className="film-reel__sub">{item.sub}</span>
                    </div>
                  </div>
                  <div className="film-reel__sprockets film-reel__sprockets--right" />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Center / Right Content Area */}
        <div className="hero-editorial__main">
          {/* Studio Manifesto Statement */}
          <div className="hero-editorial__statement-box">
            <p className="hero-editorial__statement">
              Pixora is a creative studio based in London. We think like an agency and produce like visuals for brands &amp; agencies.
            </p>
          </div>

          {/* Bottom Editorial Credits & Details */}
          <div className="hero-editorial__footer-bar">
            <div className="hero-editorial__meta-col">
              <span className="hero-editorial__meta-label">&copy;2025 MODERN STUDIO</span>
              <span className="hero-editorial__meta-sub">LONDON / UK</span>
            </div>

            <div className="hero-editorial__meta-col">
              <span className="hero-editorial__meta-item">BRAND DESIGN</span>
              <span className="hero-editorial__meta-item">MOTION GRAPHICS</span>
              <span className="hero-editorial__meta-item">ART DIRECTION</span>
            </div>

            <div className="hero-editorial__meta-col">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hero-editorial__meta-link">
                LINKEDIN ↗
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hero-editorial__meta-link">
                INSTAGRAM ↗
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hero-editorial__meta-link">
                TWITTER ↗
              </a>
            </div>

            {/* Barcode & Studio Stamp */}
            <div className="hero-editorial__stamp-col">
              <div className="hero-editorial__barcode-box">
                <span className="hero-editorial__barcode-title">PIXORA COMPANY</span>
                <svg className="hero-editorial__barcode" viewBox="0 0 120 30" fill="currentColor">
                  <rect x="0" y="0" width="3" height="30" />
                  <rect x="6" y="0" width="1.5" height="30" />
                  <rect x="11" y="0" width="4" height="30" />
                  <rect x="18" y="0" width="2" height="30" />
                  <rect x="23" y="0" width="1" height="30" />
                  <rect x="27" y="0" width="3.5" height="30" />
                  <rect x="34" y="0" width="2" height="30" />
                  <rect x="39" y="0" width="5" height="30" />
                  <rect x="47" y="0" width="1" height="30" />
                  <rect x="51" y="0" width="3" height="30" />
                  <rect x="57" y="0" width="2.5" height="30" />
                  <rect x="63" y="0" width="1" height="30" />
                  <rect x="67" y="0" width="4.5" height="30" />
                  <rect x="75" y="0" width="2" height="30" />
                  <rect x="80" y="0" width="1" height="30" />
                  <rect x="84" y="0" width="3.5" height="30" />
                  <rect x="91" y="0" width="2" height="30" />
                  <rect x="96" y="0" width="4" height="30" />
                  <rect x="103" y="0" width="1.5" height="30" />
                  <rect x="108" y="0" width="3" height="30" />
                  <rect x="114" y="0" width="2" height="30" />
                </svg>
              </div>

              <div className="hero-editorial__stamp">
                <span>ITALIAN DESIGN</span>
                <span>MODERN TOUCH</span>
                <span>DUTCH HERITAGE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
