/**
 * 
 */
package org.mspring.mlog.inf.sae;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.mspring.mlog.service.FileService;
import org.mspring.mlog.service.impl.AbstractPhotoUploadService;
import org.mspring.platform.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Gao Youbo
 * @since 2012-12-19
 * @Description
 * @TODO
 */
@Service
public class SaePhotoUploadServiceImpl extends AbstractPhotoUploadService {

    @Autowired
    private FileService fileService;

    /* (non-Javadoc)
     * @see org.mspring.mlog.service.PhotoUploadService#uploadPhoto(java.awt.image.BufferedImage, java.lang.String)
     */
    @Override
    public String uploadPhoto(BufferedImage image, String fileName) throws IOException {
        // TODO Auto-generated method stub
        return null;
    }


}
